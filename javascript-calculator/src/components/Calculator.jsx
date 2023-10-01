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
      lastOps: "",
      operation: "",
      solution: false,
      error: false,
    };
    // Fields
    this.errorMessage = "Error!";
    // This bindings to methods
    this.evaluate = this.evaluate.bind(this);
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

  componentDidUpdate() {
    let oldOps = this.state.lastOps;
    let hasMinusAfterOperator = false;
    let hasOperatorAtTheEnd = false;
    // Remove any operator at the end
    if (/[*/+-]/.test(oldOps[oldOps.length - 1]) && this.state.solution) {
      hasOperatorAtTheEnd = true;
      oldOps = oldOps.slice(0, oldOps.length - 1);
    }
    // Put any negative number, found after any operator, in parentheses
    const ops = oldOps.replaceAll(
      /[*/+-](-\d+|\(-(\d+|\d+\.\d*)\)(\.|\d+))/g,
      (matched) => {
        const op = matched[0];
        matched = matched.replaceAll(/[)(]/g, "").slice(1);
        return op + "(" + matched + ")";
      }
    );
    if (ops !== oldOps && !hasOperatorAtTheEnd) {
      hasMinusAfterOperator = true;
    }
    if (hasMinusAfterOperator || hasOperatorAtTheEnd) {
      this.setState({ lastOps: ops });
    }
  }

  evaluate() {
    this.setState((state) => {
      if (state.lastOps.length > 0) {
        const op = /[^*/+-]/.test(state.lastOps[state.lastOps.length - 1])
          ? state.lastOps
          : state.lastOps.slice(0, state.lastOps.length - 1);
        let solution;
        try {
          solution = eval?.(op);
        } catch (error) {
          solution = this.errorMessage;
        }
        // If invalid expression, 'eval' returns the same given input as it is
        if (solution === state.lastOps || solution === this.errorMessage) {
          return {
            operation: this.errorMessage,
            solution: false,
            error: true,
          };
        } else if (solution) {
          solution = solution.toString();
          // Round to at most 12 digits
          if (solution.includes(".")) {
            const arr = solution.split(".");
            if (arr[1].length > 7) {
              solution = Number(solution).toFixed(7).toString();
            }
          }
          return {
            operation: solution,
            solution: true,
          };
        }
      }
      return {};
    });
  }

  enterParentheses(value) {
    this.setState((state) => {
      const startCount = state.lastOps.match(/\(/g)?.length ?? 0;
      const endCount = state.lastOps.match(/\)/g)?.length ?? 0;
      const notEndEmpty = /[^(]/.test(state.lastOps[state.lastOps.length - 1]);
      if (
        value === "(" ||
        (value === ")" && endCount < startCount && notEndEmpty)
      ) {
        return {
          lastOps: state.lastOps + value,
          operation: value,
        };
      }
    });
  }

  enterOperator(operator) {
    this.setState((state) => {
      const regex = /[^*/+-]/;
      const regex2 = /\d[*/+-]/;
      const opLen = state.lastOps.length;
      if (
        (opLen > 0 && regex.test(state.lastOps[opLen - 1])) ||
        (opLen === 0 && operator === "-") ||
        (opLen > 0 &&
          operator === "-" &&
          regex2.test(state.lastOps.slice(opLen - 2)))
      ) {
        return {
          lastOps: state.solution
            ? state.operation + operator
            : state.lastOps + operator,
          operation: operator,
          solution: false,
        };
      } else if (opLen > 0 && !regex.test(state.lastOps[opLen - 1])) {
        return {
          lastOps: state.lastOps.slice(0, opLen - 1) + operator,
          operation: operator,
          solution: false,
        };
      }
    });
  }

  enterDecimalPoint() {
    this.setState((state) => {
      const regex =
        /^(-?\(?\d+\)?|(((\(?-?\d+\)?|\(?-?\d+\.\d+\)?)[*/+-])+(\(?-?\d+\)?)))$/;
      if (regex.test(state.operation) && state.operation.length > 0) {
        return {
          lastOps: state.lastOps + ".",
          operation: state.operation + ".",
        };
      }
    });
  }

  enterZero() {
    this.setState((state) => {
      if (state.operation.length > 0) {
        return {
          lastOps: state.lastOps + "0",
          operation: state.operation + "0",
        };
      }
    });
  }

  ClearAll() {
    this.setState({
      lastOps: "",
      operation: "",
      solution: false,
      error: false,
    });
  }

  clearInput() {
    if (this.state.error) {
      return this.ClearAll();
    }
    this.setState({ operation: "", solution: false, error: false });
  }

  clearEntry() {
    this.setState((state) => {
      if (state.error) {
        const ops = state.lastOps.slice(0, state.lastOps.length - 1);
        return {
          lastOps: ops,
          operation: ops,
          solution: false,
          error: false,
        };
      }
      if (state.operation.length > 1) {
        const newOp = state.operation.slice(0, state.operation.length - 1);
        return {
          lastOps: !state.solution
            ? state.lastOps.slice(0, state.lastOps.length - 1)
            : newOp,
          operation: newOp,
          solution: false,
        };
      }
      return {
        lastOps:
          state.lastOps.length > 1 && !state.solution
            ? state.lastOps.slice(0, state.lastOps.length - 1)
            : "",
        operation: "",
        solution: false,
      };
    });
  }

  addEntry(value) {
    this.setState((state) => {
      return {
        lastOps: !state.solution ? state.lastOps + value : value,
        operation:
          /[^)*/+-]/.test(state.operation.slice(state.operation.length - 1)) &&
          !state.solution
            ? state.operation + value
            : value,
        solution: false,
      };
    });
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
      case ENTRIES.EQUAL:
        this.evaluate();
        break;
    }
  }

  render() {
    const numButtons = [];
    for (const numKey in ENTRIES.NUMBERS) {
      numButtons.push(
        <div key={numKey} className="col-4">
          <CalcButton
            id={numKey.toLowerCase()}
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
            <CalcScreen
              currentOp={this.state.operation}
              lastOps={this.state.lastOps}
              solution={this.state.solution}
              error={this.state.error}
            />
          </div>
          <div className="col-4">
            <CalcButton
              id="clear-entry"
              text={ENTRIES.ACTIONS.CLEAR_ENTRY}
              onClick={this.onCalcButtonClick}
            />
          </div>
          <div className="col-4">
            <CalcButton
              id="clear-input"
              text={ENTRIES.ACTIONS.CLEAR}
              onClick={this.onCalcButtonClick}
            />
          </div>
          <div className="col-4">
            <CalcButton
              id="clear"
              text={ENTRIES.ACTIONS.ALL_CLEAR}
              onClick={this.onCalcButtonClick}
            />
          </div>
          <div className="col-3">
            <CalcButton
              id="add"
              text={ENTRIES.OPERATORS.ADD}
              onClick={this.onCalcButtonClick}
            />
          </div>
          <div className="col-3">
            <CalcButton
              id="subtract"
              text={ENTRIES.OPERATORS.SUBTRACT}
              onClick={this.onCalcButtonClick}
            />
          </div>
          <div className="col-3">
            <CalcButton
              id="multiply"
              text={ENTRIES.OPERATORS.MULTIPLY}
              onClick={this.onCalcButtonClick}
            />
          </div>
          <div className="col-3">
            <CalcButton
              id="divide"
              text={ENTRIES.OPERATORS.DIVIDE}
              onClick={this.onCalcButtonClick}
            />
          </div>
          <div className="col-4">
            <CalcButton
              id="parentheses-start"
              text={ENTRIES.PARENTHESES.START}
              onClick={this.onCalcButtonClick}
            />
          </div>
          <div className="col-4">
            <CalcButton
              id="parentheses-end"
              text={ENTRIES.PARENTHESES.END}
              onClick={this.onCalcButtonClick}
            />
          </div>
          <div className="col-4">
            <CalcButton
              id="decimal"
              text={ENTRIES.DECIMAL_POINT}
              onClick={this.onCalcButtonClick}
            />
          </div>
          {numButtons}
          <div className="col-8">
            <CalcButton
              id="equals"
              text={ENTRIES.EQUAL}
              onClick={this.onCalcButtonClick}
            />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Calculator;
