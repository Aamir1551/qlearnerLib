function qtable(numStates, numActions) {
  this.table = Array(numStates).fill(Array(numActions).fill(0));
}

qtable.prototype.updateCell = function(l_r, gamma, reward, state, action, newState) {
  console.log(l_r, gamma, reward, state, action, newState);
  this.table[state][action] += l_r * (reward + gamma * Math.max(...this.table[newState]) - this.table[state][action]);
}

qtable.prototype.getBestActionForState = function(state, legalActions) {
  let bestActionIndex = -1;
  let maxExpectedReward = Number.NEGATIVE_INFINITY;
  for(let i=0; i<legalActions; i++) {
    if(this.table[state][legalActions[i]] > maxExpectedReward) {
      bestActionIndex = legalActions[i];
      maxExpectedReward = this.table[state][legalActions[i]];
    }

  }
  return bestActionIndex;
}

//actionMap is an array of the actions that can be done
function agent(initialState, _actionMap,  _getNewState) {
    this.state = initialState;
    this.actionMap = _actionMap;
    this.getNewState = _getNewState;
}

agent.prototype.getStateID = function(state) {
  return Object.keys(this.actionMap).indexOf(state.toString());
}

//actionProbs is an array contianing probability of actions
agent.prototype.chooseRandomAction = function() {
  let legalActions = this.getLegalActions();
  return legalActions[Math.floor(Math.random() * legalActions.length)]
}

agent.prototype.getLegalActions = function() {
  return this.actionMap[this.state.toString()];
}

//for more complicated environments, the possible actions can be created via a function (same with rewards)
// [0=d, 1=u, 2=r, 3=l]
actionMap = { 
    '0,0': [ '0', '2' ], 
    '1,0': [ '3', '2', '0' ], 
    '2,0': [ '3', '0' ],
    '0,1': [ '1', '2', '0' ],
    '1,1': [ '1', '2', '3', '0' ],
    '2,1': [ '1', '3', '0' ],
    '0,2': [ '1', '2' ],
    '1,2': [ '1', '2', '3' ],
    '2,2': []
}

rewards = {
    '2,2': 10
}

function getNextState(action, state) { //this function is allowed to interact with the environment
  if(this.actionMap[state.toString()].indexOf(action) == -1) {
      console.log(action);
      return "invalid state";
  }

  if(action == '0') {
    state[1]+=1;
  } else if(action=='1') {
    state[1]-=1;
  } else if(action=='2') {
    state[0]+=1;
  } else if(action=='3') {
    state[0]-=1;
  }
  return state;
}


brain = new qtable(9, 4); // [r, l, u, d]
player = new agent([0,0], actionMap, getNextState);

function playgame(player, gameSteps, exp_rate) {
    player.state = [0,0]; 
    for(let i=0; i<gameSteps; i++) {
        console.log("jjjj");
        console.log(player.state);
        if(player.state.toString() === [2, 2].toString()) {
          console.log("hhh");
          break;
        }
        let currentState = player.state.toString();
        legalActions = player.getLegalActions();
        
        if(Math.random() > exp_rate) {
            actionChosen = brain.getBestActionForState(player.state, legalActions);
        } else {
            //perform random action
            actionChosen = player.chooseRandomAction();
        }

        player.state = player.getNewState(actionChosen, player.state);
        rewardRecieved = rewards[player.state] ? rewards[player.state] : 0;
        console.log(player.state);
        
        brain.updateCell(0.01, 0.9, rewardRecieved, player.getStateID(currentState.toString()), actionChosen, player.getStateID(player.state.toString()));
        
  }

}

for(let run=0; run<100; run++) {
    playgame(player, 6, 1);
}