import React, { Component } from 'react';
import './App.css';

const operators = {
  "/": (currVal, nextVal) => { return currVal / nextVal },
  "*": (currVal, nextVal) => { return currVal * nextVal },
  "+": (currVal, nextVal) => { return currVal + nextVal },
  "-": (currVal, nextVal) => { return currVal - nextVal },
  "=": (currVal, nextVal) => { return nextVal }
};

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      display: "0",
      waitingOperand: false,
      operand: null,
      value: null
    };
  }

  _displayNum = num => {
    let { display, waitingOperand } = this.state;

    if (waitingOperand){
      this.setState({
        display: String(num),
        waitingOperand: false,
      })
    } else {
      this.setState(prevState => ({
        display: (display === '0') ? String(num) : prevState.display + num,
    }));
    }
   
  };

  _calculateResult = (operator) => {
    const { value, operand, display, waitingOperand } = this.state;
    const nextVal = parseFloat(display);
console.log(operand, operator, waitingOperand);
    if (value == null) {
      this.setState({
        value: nextVal,
      });
    }
      else if(waitingOperand){
      this.setState({
        operand: operator,
        value: value,
        display: String(value)
      });
console.log(`second operand`);      

    } else if (operand) {
      const currVal = value || 0;
      let result = operators[operand](currVal, nextVal);
      let displayedResult = result.toString();
      console.log(`${currVal} ${operand} ${nextVal} = ${result}`);
      
      this.setState({
        value: result,
        display: displayedResult
      }); 
    }

    this.setState({
      waitingOperand: true,
      operand: operator,
    });
  };

  _handleDot = dot => {
    const { display, waitingOperand } = this.state;
    
    if(waitingOperand){
      this.setState({
        display: '0.',
        waitingOperand: false,
      })
    } else if (display.indexOf(dot) === -1) {
      this.setState(prevState => ({
        display: prevState.display.concat(dot),
        waitingOperand: false
      }));
    }
  };

  _allCancel = () => {
    this.setState({
      display: "0",
      value: null,
      waitingOperand: false,
      operand: null
    });
  };

  render() {
    return <div className="App">
        <div className="calc-item" id="display" onClick={this._hadleClick}>
          {this.state.display}
        </div>
        <button className="calc-item" id="clear" onClick={this._allCancel}>
          AC
        </button>
        <button className="calc-item" id="divide" onClick={() => this._calculateResult("/")}>
          /
        </button>
        <button className="calc-item" id="multiply" onClick={() => this._calculateResult("*")}>
          x
        </button>
        <button className="calc-item" id="seven" onClick={() => this._displayNum(7)}>
          7
        </button>
        <button className="calc-item" id="eight" onClick={() => this._displayNum(8)}>
          8
        </button>
        <button className="calc-item" id="nine" onClick={() => this._displayNum(9)}>
          9
        </button>
        <button className="calc-item" id="subtract" onClick={() => this._calculateResult("-")}>
          -
        </button>
        <button className="calc-item" id="four" onClick={() => this._displayNum(4)}>
          4
        </button>
        <button className="calc-item" id="five" onClick={() => this._displayNum(5)}>
          5
        </button>
        <button className="calc-item" id="six" onClick={() => this._displayNum(6)}>
          6
        </button>
        <button className="calc-item" id="add" onClick={() => this._calculateResult("+")}>
          +
        </button>
        <button className="calc-item" id="one" onClick={() => this._displayNum(1)}>
          1
        </button>
        <button className="calc-item" id="two" onClick={() => this._displayNum(2)}>
          2
        </button>
        <button className="calc-item" id="three" onClick={() => this._displayNum(3)}>
          3
        </button>
        <button className="calc-item" id="equals" onClick={() => this._calculateResult("=")}>
          =
        </button>
        <button className="calc-item" id="zero" onClick={() => this._displayNum(0)}>
          0
        </button>
        <button className="calc-item" id="decimal" onClick={() => this._handleDot(".")}>
          .
        </button>
      </div>;
  }
}

export default App;
