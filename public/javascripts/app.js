
var TicTacToe = React.createClass({
  render: function() {
    return (
      <div className="ticTacToe">
        <h1>Tic Tac Toe</h1>
        <Grid onMouseDown={this.handleClick} fields={this.props.state.fields} />
      </div>
      );
  },

  handleClick: function(fieldId) {
    console.log("clicked", fieldId);
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
        <WinningCombination />
      </div>
    );
  }
});


var Field = React.createClass({
  imageFiles: {
    'x': '/images/stone-x.png',
    'o': '/images/stone-o.png',
    '': '/images/stone-none.png'
  },

  imageFile: function() {
    return this.imageFiles[this.props.stone];
  },

  render: function() {
    var fieldClass = "field field-" + this.props.id;
    return (
      <img src={this.imageFile()} className={fieldClass} onMouseDown={this.handleClick} />
      );
  },

  handleClick: function() {
    this.props.onMouseDown(this.props.id);
  }
});

var WinningCombination = React.createClass({
  render: function() {
    var winningCombinationClass = "winningCombination winningCombination-7";

    return (
      <img className={winningCombinationClass} src="/images/line.png" />
    );
  }
});

var ticTacToeReducer = function(state, action) {
  console.log("ticTacToeReducer state:", state, "action:", action);

  // Redux rule: On state == undefined return the initial state.
  if(state === undefined) {
    return { fields: ['o', 'o', 'o', 'x', 'x', 'x', 'o', 'o', 'x'], nextStone: 'x' };
  }

  switch(action.type) {
    case 'SELECT_FIELD':
      return selectField(action, state);

    default:
      // Redux rule: For unknown actions return the given state.
      return state;
    }
};

var selectField = function(action, state) {
  var fieldId = action.id;
  var fields = state.fields;

  if(fieldId === undefined) {
    throw("Bad fieldId");
  }
  if(fields === undefined) {
    throw("Bad fields");
  }

  var nextStone = state.nextStone;
  var newNextStone = nextStone === 'x' ? 'o' : 'x';

  // Copy the array
  var newFields = fields.slice();
  newFields[fieldId] = nextStone;

  return Object.assign({}, state, { fields: newFields, nextStone: newNextStone })
}

var render = function() {
  ReactDOM.render(
    (
      <TicTacToe state={store.getState()}/>
      ),
    document.getElementById('content')
    );
};

var store = Redux.createStore(ticTacToeReducer);
store.subscribe(render);

render();

