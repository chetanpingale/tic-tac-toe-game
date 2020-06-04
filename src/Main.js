import React from 'react';
import ReactDOM from 'react-dom';

const rowStyle = {
  display: 'flex'
}

const squareStyle = {
  'width':'60px',
  'height':'60px',
  'backgroundColor': '#ddd',
  'margin': '4px',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'fontSize': '20px',
  'color': 'white',
  'cursor': 'pointer',
}

const boardStyle = {
  'backgroundColor': '#eee',
  'width': '208px',
  'alignItems': 'center',
  'justifyContent': 'center',
  'display': 'flex',
  'flexDirection': 'column',
  'border': '3px #eee solid'
}

const containerStyle = {
  'display': 'flex',
  'alignItems': 'center',
  'flexDirection': 'column'
}

const instructionsStyle = {
  'marginTop': '5px',
  'marginBottom': '5px',
  'fontWeight': 'bold',
  'fontSize': '16px',
}

const buttonStyle = {
  'marginTop': '15px',
  'marginBottom': '16px',
  'width': '80px',
  'height': '40px',
  'backgroundColor': '#8acaca',
  'color': 'white',
  'fontSize': '16px',
  'cursor': 'pointer',
}

const disableClick = {
  'pointerEvents': 'none',
  'opacity': '0.5',
}

class Square extends React.Component {
  render() {
    const {id, handleClick, value, isWinner} = this.props;
    const style = isWinner ? {...squareStyle, ...disableClick} : squareStyle;
    return (
      <div
        key={id}
        id={id}
        className="square"
        style={style}
        onClick={() => handleClick(id)}
        >
        {value || ''}
      </div>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPlayer: 'X',
      first: null,
      second: null,
      third: null,
      fourth: null,
      fifth: null,
      sixth: null,
      seventh: null,
      eighth: null,
      nineth: null,
    }
    this.setValue = this.setValue.bind(this);
    this.onReset = this.onReset.bind(this);
  }
  onReset() {
    const _state = {
      currentPlayer: 'X',
      first: null,
      second: null,
      third: null,
      fourth: null,
      fifth: null,
      sixth: null,
      seventh: null,
      eighth: null,
      nineth: null,
      
    };
    this.setState(_state);
  }
  setValue(stateName) {
    const _currentPlayer = this.state.currentPlayer;
    const nextPlayer = _currentPlayer === 'X' ? 'O' : 'X';
  
    if(this.state[stateName] === null) {
      this.setState({[stateName]: _currentPlayer, currentPlayer: nextPlayer});
    }
  }
  validateWinner() {
    const {first, second, third, fourth, fifth ,sixth, seventh, eighth, nineth} = this.state;
    const winnerData = [
      [first, second, third],
      [fourth, fifth ,sixth],
      [sixth, seventh, eighth],

      [first, fourth, seventh],
      [second, fifth, eighth],
      [third, sixth, nineth],

      [first, fifth, nineth],
      [third, fifth, seventh],
    ];
    for(let i=0; i < winnerData.length; i++) {
      const [v1, v2, v3] = winnerData[i];
      if(v1 && v2 && v3 && v1 === v2 && v2 === v3) {
        return v1;
      }
    }
    return false;
  }
  render() {
    const {first, second, third, fourth, fifth ,sixth, seventh, eighth, nineth, currentPlayer} = this.state;
    const isWinner = this.validateWinner();
    let noWinner = false;
    if(first && second && third && fourth && fifth && sixth && seventh && eighth && nineth && !isWinner) {
      noWinner = true;
    }
    return (
      <div style={containerStyle} className="gameBoard">
        <div className="status" style={instructionsStyle}><h4>Game ON 😉</h4></div>
        <div className="status" style={instructionsStyle}>Next player: {currentPlayer}</div>
        <div className="winner" style={instructionsStyle}>{isWinner ? `Winner is: ${isWinner}` : 'Winner: None'}</div>
        {isWinner ? <div>Click reset button to start new game!!!</div> : null}
        {noWinner ? <div>Nobody Wins, Click reset button to start new game!!!</div> : null}
        <button style={buttonStyle} onClick={this.onReset}>Reset</button>
        <div style={boardStyle}>
          <div className="board-row" style={rowStyle}>
            <Square id='first' value={first} handleClick={this.setValue} isWinner={isWinner} />
            <Square id='second' value={second}  handleClick={this.setValue} isWinner={isWinner} />
            <Square id='third' value={third} handleClick={this.setValue} isWinner={isWinner} />
          </div>
          <div className="board-row" style={rowStyle}>
            <Square id='fourth' value={fourth} handleClick={this.setValue} isWinner={isWinner} />
            <Square id='fifth' value={fifth} handleClick={this.setValue} isWinner={isWinner} />
            <Square id='sixth' value={sixth} handleClick={this.setValue} isWinner={isWinner} />
          </div>
          <div className="board-row" style={rowStyle}>
            <Square id='seventh' value={seventh} handleClick={this.setValue} isWinner={isWinner} />
            <Square id='eighth' value={eighth} handleClick={this.setValue} isWinner={isWinner} />
            <Square id='nineth' value={nineth} handleClick={this.setValue} isWinner={isWinner} />
          </div>
        </div>
      </div>
    );
  }
}

class Main extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    );
  }
}

export default Main;
