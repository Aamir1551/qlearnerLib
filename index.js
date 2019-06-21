function qtable(numStates, numActions) {
  this.table = Array(numStates).fill(Array(numActions).fill(0));
}

qtable.prototype.updateCell = function(l_r, gamma, reward, state, action, newState) {
  console.log(l_r, gamma, reward, state, action, newState);
  console.log(this.table[state][action]);
  
  this.table[state][action] += l_r * (reward + gamma * Math.max(...this.table[newState]) - this.table[state][action]);
}

qtable.prototype.getBestActionForState = function(state, legalActions) {
  let bestActionIndex = -1;
  let maxExpectedReward = Number.NEGATIVE_INFINITY;
  for(let i=0; i<legalActions; i++) {
    if(this.table[state.toString()][legalActions[i]] > maxExpectedReward) {
      bestActionIndex = legalActions[i];
      maxExpectedReward = this.table[state][legalActions[i]];
    }

  }
  return bestActionIndex;
}

//actionMap is an array of the actions that can be done
function agent(initialState, _actionMap,  _getNewState, _isActionValid, _actionSet) {
    this.state = initialState;
    this.actionMap = _actionMap;
    this.getNewState = _getNewState;
    this.isActionValid = _isActionValid;
    this.actionSet = _actionSet;
}

agent.prototype.getActionID = function(action) {
  return this.actionSet.indexOf(action); 
}

agent.prototype.getStateID = function(state) {
  return Object.keys(this.actionMap).indexOf(state);
}


//actionProbs is an array contianing probability of actions
agent.prototype.chooseAction= function(actionsProbs) {
  let sumed = actionsProbs.reduce((a, b)=>a+b);
  let c = sumed * Math.random();
  let actionChosen = -1;
  while(c>0) {
    actionChosen++;
    c-=actionsProbs[actionChosen];
  }
  return actionChosen;
}

function checkIsValidMovement(state, action) {
    return this.actionMap[state.toString()].indexOf(action) != -1;
}

//for more complicated environments, the possible actions can be created via a function (same with rewards)
actionMap = { 
    '0,0': [ 'd', 'r' ], 
    '1,0': [ 'l', 'r', 'd' ], 
    '2,0': [ 'l', 'd' ],
    '0,1': [ 'u', 'r', 'd' ],
    '1,1': [ 'u', 'r', 'l', 'd' ],
    '2,1': [ 'u', 'l', 'd' ],
    '0,2': [ 'u', 'r' ],
    '1,2': [ 'u', 'r', 'l' ],
    '2,2': []
}

rewards = {
    '2,2': 0
}

function getNextState(action, state) { //this function is allowed to interact with the environment
  if(this.actionMap[state.toString()].indexOf(action) == -1) {
      return "invalid state";
  }

  if(action == 'd') {
    state[1]+=1;
  } else if(action=='u') {
    state[1]-=1;
  } else if(action=='r') {
    state[0]+=1;
  } else if(action=='l') {
    state[0]-=1;
  }
  return state;
}


brain = new qtable(3, 4); // [r, l, u, d]
player = new agent([0,0], actionMap, getNextState, checkIsValidMovement, ['r', 'l', 'u', 'd']);

function playgame(player, gameSteps, exp_rate) {
    
    for(let i=0; i<gameSteps; i++) {
        let currentState = player.state.toString();
        console.log(currentState);
        legalActions = player.actionMap[player.state.toString()];
        
        if(Math.random() > exp_rate) {
            //pick best action
            actionChosen = brain.getBestActionForState(player.state);
            //actionChosen = brain.table[player.state.toString()].indexOf(Math.max(brain.state.toString()));
        } else {
            //perform random action
            console.log("sss");
            console.log(legalActions);

            actionChosen = legalActions[player.chooseAction(Array(legalActions.length).fill(1/legalActions.length))];
        }
        player.state = player.getNewState(actionChosen, player.state);
        rewardRecieved = rewards[player.state] ? rewards[player.state] : 0;
        brain.updateCell(0.01, 0.9, rewardRecieved, player.getStateID(currentState.toString()), player.getActionID(actionChosen), player.getStateID(player.state.toString()));

  }

}

for(let run=0; run<100; run++) {
    playgame(player, 6, 1);
}