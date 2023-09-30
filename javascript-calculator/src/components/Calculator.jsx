import { Component, Fragment } from "react";
import CalcButton from "./CalcButton";
import CalcScreen from "./CalcScreen";

const ENTRIES = {
  EQUAL: "=",
  DECIMAL_POINT: ".",
  PARENTHESES: {
    START: "(",
    END: ")",
  },
  NUMBERS: {
    SEVEN: "7",
    EIGHT: "8",
    NINE: "9",
    FOUR: "4",
    FIVE: "5",
    SIX: "6",
    ONE: "1",
    TWO: "2",
    THREE: "3",
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
    this.enterParentheses = this.enterParentheses.bind(this);
    this.enterOperator = this.enterOperator.bind(this);
    this.enterDecimalPoint = this.enterDecimalPoint.bind(this);
    this.enterZero = this.enterZero.bind(this);
    this.ClearAll = this.ClearAll.bind(this);
    this.clearInput = this.clearInput.bind(this);
    this.clearEntry = this.clearEntry.bind(this);
    this.addEntry = this.addEntry.bind(this);
    this.onCalcButtonClick = this.onCalcButtonClick.bind(this);
  }

  enterParentheses(value) {
    this.setState((state) => {
      const startCount = state.operation.match(/\(/g)?.length ?? 0;
      const endCount = state.operation.match(/\)/g)?.length ?? 0;
      const notEndEmpty = /[^(]/.test(
        state.operation[state.operation.length - 1]
      );
      if (
        value === "(" ||
        (value === ")" && endCount < startCount && notEndEmpty)
      ) {
        return { operation: state.operation + value };
      }
    });
  }

  enterOperator(operator) {
    this.setState((state) => {
      const regex = /[^*/+-]/;
      const opLen = state.operation.length;
      if (
        (opLen > 0 && regex.test(state.operation[opLen - 1])) ||
        (opLen === 0 && operator === "-")
      ) {
        return { operation: state.operation + operator };
      }
    });
  }

  enterDecimalPoint() {
    this.setState((state) => {
      const regex = /^(-?\d+|(((-?\d+|-?\d+\.\d+)[*/+-])+(\d+|\(-\d+\))))$/;
      if (regex.test(state.operation) && state.operation.length > 0) {
        return { operation: state.operation + "." };
      }
    });
  }

  enterZero() {
    this.setState((state) => {
      if (state.operation.length > 0) {
        return {
          operation: state.operation + "0",
        };
      }
    });
  }

  ClearAll() {
    this.setState({ operation: "", lastOps: "" });
  }

  clearInput() {
    this.setState({ operation: "" });
  }

  clearEntry() {
    this.setState((state) => {
      if (state.operation.length > 1) {
        return {
          operation: state.operation.slice(0, state.operation.length - 1),
        };
      }
      return {
        operation: "",
      };
    });
  }

  addEntry(value) {
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
      case ENTRIES.DECIMAL_POINT:
        this.enterDecimalPoint();
        break;
      case ENTRIES.PARENTHESES.START:
      case ENTRIES.PARENTHESES.END:
        this.enterParentheses(value);
        break;
      case ENTRIES.OPERATORS.ADD:
      case ENTRIES.OPERATORS.SUBTRACT:
      case ENTRIES.OPERATORS.MULTIPLY:
      case ENTRIES.OPERATORS.DIVIDE:
        this.enterOperator(value);
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
        this.addEntry(value);
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
          <div className="col-4">
            <CalcButton
              text={ENTRIES.PARENTHESES.START}
              onClick={this.onCalcButtonClick}
            />
          </div>
          <div className="col-4">
            <CalcButton
              text={ENTRIES.PARENTHESES.END}
              onClick={this.onCalcButtonClick}
            />
          </div>
          <div className="col-4">
            <CalcButton
              text={ENTRIES.DECIMAL_POINT}
              onClick={this.onCalcButtonClick}
            />
          </div>
          {numButtons}
          <div className="col-8">
            <CalcButton text={ENTRIES.EQUAL} onClick={this.onCalcButtonClick} />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Calculator;
