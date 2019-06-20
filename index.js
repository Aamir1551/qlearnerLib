function qtable(numStates, numAction) {
    this.table = Array(numStates).fill(Array(numAction).fill(0));
}

qtable.updateCell = function(l_r, gamma, reward, state, action, newState) {
    this.table[state][action] += l_r * (reward + gamma * Math.max(...this.table[newState] - this.table[state][action]));
}

//actionMap is an array of the actions that can be done
function agent(initialState, _actionMap,  _getNewState, _isActionValid, _actionSet) {
    this.state = initialState;
    this.actionMap = _actionMap;
    this.getNewState = _getNewState;
    this.isActionValid = _isActionValid;
    this.actionSet = _actionSet;
}


//actionProbs is an array contianing probability of actions
agent.prototype.chooseAction(actionsProbs) = function() {
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

map = [
  [
    [0, ["d", "r"]], [0, ["l", "r", "d"]], [0, ["l", "d"]]
  ],
  [
    [0, ["u", "r", "d"]], [0,["u", "r", "l", "d"]], [0,["u", "l", "d"]]
  ],
  [
    [0, ["u", "r"]], [0, ["u", "r", "l"]], [1, []]
  ]
]

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
  if(this.actionMap[state.toString].indexOf(action) == -1) {
      return "invalid state";
  }
  if(action == 'd') {
    state[1]+=3;
  } else if(action=='u') {
    state[1]-=3;
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
        
        actions = brain.table[y*3+x-1];
        current_state = player.actionMap
        
        if(Math.random() > exp_rate) {
            //pick best action
            do {
                actionChosen = actions.indexOf(Math.max(...actions));
            } while(player.checkIsValidMovement(player.state, actionChosen));
        
        } else {

            //perform random action
            player.performAction()
            actionChosen = player.actionMap[y*3+x-1][1]


    }

  }



}



for(let i=0; i<100; i++) {
  for(let )
}