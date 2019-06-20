function qtable(numStates, numAction) {
  this.table = Array(numStates).fill(Array(numAction).fill(0));
}

qtable.updateCell = function(l_r, gamma, reward, state, action, newState) {
  this.table[state][action] += l_r * (reward + gamma * Math.max(...this.table[newState] - this.table[state][action]));
}

//actionMap is an array of the actions that can be done
function agent(_actionMap,  _getNewState, _isActionValid) {
  this.actionMap = _actionMap;
  this.getNewState = _getNewState;
  this.isActionValid = _isActionValid;
}


//actionProbs is an array contianing probability of actions
agent.prototype.performAction(actionsProbs) = function() {
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
  return this.actionMap[state[0]][state[1]][1].indexOf(action) != -1;
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

actionMap = { 
  1: [ 'd', 'r' ], 
  2: [ 'l', 'r', 'd' ], 
  3:[ 'l', 'd' ],
  4: [ 'u', 'r', 'd' ],
  5: [ 'u', 'r', 'l', 'd' ],
  6: [ 'u', 'l', 'd' ],
  7: [ 'u', 'r' ],
  8: [ 'u', 'r', 'l' ],
  9: [] }

rewards = {
  9: 0
}

function getNextState(action, state) { //this function is allowed to interact with the environment
  if(action == 'd') {
    state[1]+=3;
  } else if(action=='u') {
    state[1]-=3;
  } else if(action=='r') {
    state[0]+=1;
  } else if(action=='l') {
    state[0]-=1;
  }
  if(state[0] < 0 || state[1] < 0) { //this is bad (in future we should check if the action is ALLOWED within the state (and not see if the state we ended up in is valid))
    return "invalid state";
  }
  return state;
}


brain = new qtable(3, 4); // [r, l, u, d]
player = new agent(map, getNextState, checkIsValidMovement);
function playgame(player, gameSteps, exp_rate) {
  x = 0;
  y = 0;

  for(let i=0; i<gameSteps; i++) {
    actions = brain.table[y*3+x-1];
    current_state = player.actionMap[;

    if(Math.random() > exp_rate) {
      do {
        actionChosen = actions.indexOf(Math.max(...actions));
      } while(player.checkIsValidMovement([x, y], actionChosen));
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