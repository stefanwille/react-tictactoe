'use strict';


var TicTacToe = React.createClass({
  render: function() {
    return (
      <div className="ticTacToe">
        <h1>Tic Tac Toe</h1>
        <Grid onMouseDown={this.handleClick} fields={this.props.state.fields} winningCombination={this.props.state.winningCombination} />
      </div>
      );
  },

  handleClick: function(fieldId) {
    store.dispatch({type: 'SELECT_FIELD', id: fieldId})
  }
});


var Grid = React.createClass({
  render: function() {
    return (
      <div className="grid">
        <img src="/images/grid.png" />
        <Field id="0" stone={this.props.fields[0]} onMouseDown={this.props.onMouseDown} />
        <Field id="1" stone={this.props.fields[1]} onMouseDown={this.props.onMouseDown} />
        <Field id="2" stone={this.props.fields[2]} onMouseDown={this.props.onMouseDown} />
        <Field id="3" stone={this.props.fields[3]} onMouseDown={this.props.onMouseDown} />
        <Field id="4" stone={this.props.fields[4]} onMouseDown={this.props.onMouseDown} />
        <Field id="5" stone={this.props.fields[5]} onMouseDown={this.props.onMouseDown} />
        <Field id="6" stone={this.props.fields[6]} onMouseDown={this.props.onMouseDown} />
        <Field id="7" stone={this.props.fields[7]} onMouseDown={this.props.onMouseDown} />
        <Field id="8" stone={this.props.fields[8]} onMouseDown={this.props.onMouseDown} />
        <WinningCombination id={this.props.winningCombination}/>
      </div>
    );
  }
});


var Field = React.createClass({
  render: function() {
    return (
      <img src={this.imageFile()} className={"field field-" + this.props.id} onMouseDown={this.handleClick} />
    );
  },

  IMAGE_FILE_MAPPING: {
    'x': '/images/stone-x.png',
    'o': '/images/stone-o.png',
    '':  '/images/stone-none.png'
  },

  imageFile: function() {
    return this.IMAGE_FILE_MAPPING[this.props.stone];
  },

  handleClick: function() {
    this.props.onMouseDown(this.props.id);
  }
});


var WinningCombination = React.createClass({
  render: function() {
    var className = "winningCombination ";
    if(this.props.id) {
      className += "winningCombination-" + this.props.id;
    } else {
      className += "winningCombination-none";
    }

    return (
      <img src="/images/line.png" className={className} />
    );
  }
});

var INITIAL_STATE = {
    fields: ['', '', '', '', '', '', '', '', ''],
    nextStone: 'x',
    winningCombination: undefined,
    gameIsOver: false
};

var ticTacToeReducer = function(state, action) {
  console.log("ticTacToeReducer state:", state, "action:", action);

  // Redux rule: On state == undefined return the initial state.
  if(state === undefined) {
    return INITIAL_STATE;
  }

  switch(action.type) {
    case 'SELECT_FIELD':
      return selectField(action, state);

    default:
      // Redux rule: For unknown actions return the given state.
      return state;
    }
};

var selectField = function(action, oldState) {
  var fieldId = action.id;
  var fields = oldState.fields;

  if(oldState.gameIsOver) {
    return INITIAL_STATE;
  }

  // Only set a stone if there is none yet.
  if(fields[fieldId] != '') {
    return oldState;
  }

  // Make a new state object by cloning the old one.
  var state = Object.assign({}, oldState);

  // Which stone to set?
  var nextStone = state.nextStone;
  state.nextStone = nextStone === 'x' ? 'o' : 'x';

  // Set the stone.
  state.fields = fields.slice();
  state.fields[fieldId] = nextStone;

  // Find the winner (if any).
  var oldWinningCombination = state.winningCombination;
  state.winningCombination = (oldWinningCombination) ? oldWinningCombination : winningCombination(state.fields);

  var isTie = !state.winningCombination && numberOfStones(state.fields) == 9;

  state.gameIsOver = state.winningCombination || isTie;

  return state;
};

var WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

var winningCombination = function(fields) {
  for(var i = 0; i < WINNING_COMBINATIONS.length; i++) {
    var combination = WINNING_COMBINATIONS[i];
    if(fields[combination[0]] !== '' && fields[combination[0]] === fields[combination[1]] && fields[combination[1]] === fields[combination[2]]) {
      return i.toString();
    }
  }

  return undefined;
};

var numberOfStones = function(fields) {
  return fields.reduce(function(sum, stone) {
    return sum + ((stone != '') ? 1 : 0);
  }, 0);
};

var render = function() {
  ReactDOM.render(
    (
      <TicTacToe state={store.getState()}/>
      ),
    document.getElementById('content')
    );
};

var logState = function() {
  console.log("New state:", store.getState());
};

var store = Redux.createStore(ticTacToeReducer);
store.subscribe(render);
store.subscribe(logState);

render();

