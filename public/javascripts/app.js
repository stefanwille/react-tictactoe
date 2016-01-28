var TicTacToe = React.createClass({
  render: function() {
    return (
      <div className="ticTacToe">
        <h1>Tic Tac Toe</h1>
        <Grid />
      </div>
    );
  }
});


var Grid = React.createClass({
  render: function() {
    return (
      <div className="grid">
        <img src="/images/grid.png" />
        <Field id="0" stone="o" />
        <Field id="1" stone="x" />
        <Field id="2" stone="o" />
        <Field id="3" stone="o" />
        <Field id="4" stone="x" />
        <Field id="5" stone="o" />
        <Field id="6" stone="" />
        <Field id="7" stone="o" />
        <Field id="8" stone="x" />
      </div>
    );
  }
});


var Field = React.createClass({
  getInitialState: function() {
    return {
      stone: this.props.stone
    }
  },

  imageFiles: {
    'x': '/images/stone-x.png',
    'o': '/images/stone-o.png',
    '': '/images/stone-none.png'
  },

  imageFile: function() {
    return this.imageFiles[this.state.stone];
  },

  handleClick: function() {
    switch(this.state.stone) {
      case 'x':
        this.setState({stone: 'o'});
        break;
      case 'o':
        this.setState({stone: ''});
        break;
      case '':
        this.setState({stone: 'x'});
        break;
    }
  },

  render: function() {
    var fieldClass = "field field-" + this.props.id;
    return (
      <img src={this.imageFile()} className={fieldClass} onMouseDown={this.handleClick} />
    );
  }
})

ReactDOM.render(
  (
    <TicTacToe />
  ),
  document.getElementById('content')
);
