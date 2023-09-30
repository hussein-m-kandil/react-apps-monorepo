import { Component, Fragment } from "react";
import CalcButton from "./CalcButton";
import CalcScreen from "./CalcScreen";

const ENTRIES = {
  EQUAL: "=",
  DECIMAL_POINT: ".",
  NUMBERS: {
    ONE: "1",
    TWO: "2",
    THREE: "3",
    FOUR: "4",
    FIVE: "5",
    SIX: "6",
    SEVEN: "7",
    EIGHT: "8",
    NINE: "9",
    ZERO: "0",
  },
  OPERATORS: {
    ADD: "+",
    SUBTRACT: "-",
    MULTIPLY: "*",
    DIVIDE: "/",
  },
  ACTIONS: {
    CLEAR: "C",
    CLEAR_ENTRY: "CE",
    ALL_CLEAR: "AC",
  },
};

class Calculator extends Component {
  constructor(props) {
    super(props);
    // State
    this.state = {
      lastOps: "1+2*3/3=3",
      operation: "1+2*3/4",
    };
    // This bindings to methods
    this.enterZero = this.enterZero.bind(this);
    this.ClearAll = this.ClearAll.bind(this);
    this.clearInput = this.clearInput.bind(this);
    this.clearEntry = this.clearEntry.bind(this);
    this.addToOperation = this.addToOperation.bind(this);
    this.onCalcButtonClick = this.onCalcButtonClick.bind(this);
  }

  enterZero() {
    this.setState((state) => {
      if (state.operation.slice(state.operation.length - 1) !== "0") {
        return {
          operation: state.operation + "0",
        };
      }
    });
  }

  ClearAll() {
    this.setState({ operation: "0", lastOps: "" });
  }

  clearInput() {
    this.setState({ operation: "0" });
  }

  clearEntry() {
    this.setState((state) => {
      if (state.operation.length > 1) {
        return {
          operation: state.operation.slice(0, state.operation.length - 1),
        };
      }
      return {
        operation: "0",
      };
    });
  }

  addToOperation(value) {
    this.setState((state) => ({
      operation: state.operation + value,
    }));
  }

  onCalcButtonClick(value) {
    switch (value) {
      case ENTRIES.ACTIONS.CLEAR_ENTRY:
        this.clearEntry();
        break;
      case ENTRIES.ACTIONS.CLEAR:
        this.clearInput();
        break;
      case ENTRIES.ACTIONS.ALL_CLEAR:
        this.ClearAll();
        break;
      case ENTRIES.NUMBERS.ZERO:
        this.enterZero();
        break;
      case ENTRIES.OPERATORS.ADD:
      case ENTRIES.OPERATORS.SUBTRACT:
      case ENTRIES.OPERATORS.MULTIPLY:
      case ENTRIES.OPERATORS.DIVIDE:
        break;
      case ENTRIES.NUMBERS.ONE:
      case ENTRIES.NUMBERS.TWO:
      case ENTRIES.NUMBERS.THREE:
      case ENTRIES.NUMBERS.FOUR:
      case ENTRIES.NUMBERS.FIVE:
      case ENTRIES.NUMBERS.SIX:
      case ENTRIES.NUMBERS.SEVEN:
      case ENTRIES.NUMBERS.EIGHT:
      case ENTRIES.NUMBERS.NINE:
        this.addToOperation(value);
        break;
    }
  }

  render() {
    const numButtons = [];
    for (const numKey in ENTRIES.NUMBERS) {
      numButtons.push(
        <div key={numKey} className="col-4">
          <CalcButton
            text={ENTRIES.NUMBERS[numKey]}
            onClick={this.onCalcButtonClick}
          />
        </div>
      );
    }
    return (
      <Fragment>
        <div className="row p-0 m-0 g-2">
          <div className="col-12">
            <CalcScreen text={this.state.operation} ops={this.state.lastOps} />
          </div>
          <div className="col-4">
            <CalcButton
              text={ENTRIES.ACTIONS.CLEAR_ENTRY}
              onClick={this.onCalcButtonClick}
            />
          </div>
          <div className="col-4">
            <CalcButton
              text={ENTRIES.ACTIONS.CLEAR}
              onClick={this.onCalcButtonClick}
            />
          </div>
          <div className="col-4">
            <CalcButton
              text={ENTRIES.ACTIONS.ALL_CLEAR}
              onClick={this.onCalcButtonClick}
            />
          </div>
          <div className="col-3">
            <CalcButton
              text={ENTRIES.OPERATORS.ADD}
              onClick={this.onCalcButtonClick}
            />
          </div>
          <div className="col-3">
            <CalcButton
              text={ENTRIES.OPERATORS.SUBTRACT}
              onClick={this.onCalcButtonClick}
            />
          </div>
          <div className="col-3">
            <CalcButton
              text={ENTRIES.OPERATORS.MULTIPLY}
              onClick={this.onCalcButtonClick}
            />
          </div>
          <div className="col-3">
            <CalcButton
              text={ENTRIES.OPERATORS.DIVIDE}
              onClick={this.onCalcButtonClick}
            />
          </div>
          {numButtons}
          <div className="col-4">
            <CalcButton
              text={ENTRIES.DECIMAL_POINT}
              onClick={this.onCalcButtonClick}
            />
          </div>
          <div className="col-4">
            <CalcButton text={ENTRIES.EQUAL} onClick={this.onCalcButtonClick} />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Calculator;
