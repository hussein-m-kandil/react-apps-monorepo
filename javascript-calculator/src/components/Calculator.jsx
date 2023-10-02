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
    this.clearEntry = this.clearEntry.bind(this);
    this.addEntry = this.addEntry.bind(this);
    this.onCalcButtonClick = this.onCalcButtonClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", (e) => {
      e.preventDefault();
      this.onCalcButtonClick(e.key);
    });
  }

  componentDidUpdate() {
    let oldOps = this.state.lastOps;
    let hasOperatorAtTheEnd = false;
    // Remove any operator at the end
    if (this.state.solution) {
      oldOps = oldOps.replaceAll(/[*/+-]+=/g, "=");
      if (this.state.lastOps !== oldOps) {
        hasOperatorAtTheEnd = true;
      }
    }
    // Remove multiple consecutive operators, except for '-'.
    let hasSequenceOfOperators = false;
    const ops = oldOps.replaceAll(/[*/+-][*/+-]+/g, (match) => {
      return match[match.length - 1] === "-"
        ? match.slice(match.length - 2)
        : match[match.length - 1];
    });
    if (ops !== oldOps) {
      hasSequenceOfOperators = true;
    }
    // Set the state only if there is a change,
    // to avoid infinite loop of state setting.
    if (hasOperatorAtTheEnd || hasSequenceOfOperators) {
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
        } else {
          solution = solution?.toString();
          // Round to at most 12 digits
          if (solution?.includes(".")) {
            const arr = solution.split(".");
            if (arr[1].length > 7) {
              solution = Number(solution).toFixed(7).toString();
            }
          }
          return {
            lastOps: state.lastOps + "=" + solution,
            operation: solution,
            solution: true,
            error: false,
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
      const notEndEmpty = /[^(*/+-]/.test(
        state.lastOps[state.lastOps.length - 1]
      );
      if (
        value === "(" ||
        (value === ")" && endCount < startCount && notEndEmpty)
      ) {
        return {
          lastOps: !state.solution ? state.lastOps + value : value,
          operation: value,
          solution: false,
          error: false,
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
          error: false,
        };
      } else if (opLen > 0 && !regex.test(state.lastOps[opLen - 1])) {
        return {
          lastOps: state.lastOps.slice(0, opLen - 1) + operator,
          operation: operator,
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
          lastOps: !state.solution ? state.lastOps + "." : "0.",
          operation: !state.solution ? state.operation + "." : "0.",
          solution: false,
          error: false,
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
        lastOps: state.solution ? value : state.lastOps + value,
        operation:
          /[^)*/+-]/.test(state.operation.slice(state.operation.length - 1)) &&
          !state.solution
            ? state.operation + value
            : value,
        solution: false,
        error: false,
      };
    });
  }

  onCalcButtonClick(value) {
    switch (value) {
      case "c":
      case ENTRIES.ACTIONS.CLEAR_ENTRY:
        this.clearEntry();
        break;
      case "a":
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
      case "Enter":
      case ENTRIES.EQUAL:
        this.evaluate();
        break;
    }
  }

  render() {
    const numButtons = [];
    for (const numKey in ENTRIES.NUMBERS) {
      if (ENTRIES.NUMBERS[numKey] === ENTRIES.NUMBERS.ZERO) {
        continue;
      }
      numButtons.push(
        <div key={numKey} className="col">
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
          <div
            className={
              "container p-0 " +
              (window.innerHeight > window.innerWidth ? "col-12" : "col-7")
            }
          >
            <div className="row row-cols-2 m-0 g-2 p-0">
              <div className="col">
                <CalcButton
                  id="clear-entry"
                  text={ENTRIES.ACTIONS.CLEAR_ENTRY}
                  onClick={this.onCalcButtonClick}
                />
              </div>
              <div className="col">
                <CalcButton
                  id="clear"
                  text={ENTRIES.ACTIONS.ALL_CLEAR}
                  onClick={this.onCalcButtonClick}
                />
              </div>
            </div>
            <div className="row row-cols-4 m-0 g-2 p-0">
              <div className="col">
                <CalcButton
                  id="add"
                  text={ENTRIES.OPERATORS.ADD}
                  onClick={this.onCalcButtonClick}
                />
              </div>
              <div className="col">
                <CalcButton
                  id="subtract"
                  text={ENTRIES.OPERATORS.SUBTRACT}
                  onClick={this.onCalcButtonClick}
                />
              </div>
              <div className="col">
                <CalcButton
                  id="multiply"
                  text={ENTRIES.OPERATORS.MULTIPLY}
                  onClick={this.onCalcButtonClick}
                />
              </div>
              <div className="col">
                <CalcButton
                  id="divide"
                  text={ENTRIES.OPERATORS.DIVIDE}
                  onClick={this.onCalcButtonClick}
                />
              </div>
            </div>
            <div className="row row-cols-3 m-0 g-2 p-0">
              <div className="col">
                <CalcButton
                  id="parentheses-start"
                  text={ENTRIES.PARENTHESES.START}
                  onClick={this.onCalcButtonClick}
                />
              </div>
              <div className="col">
                <CalcButton
                  id="parentheses-end"
                  text={ENTRIES.PARENTHESES.END}
                  onClick={this.onCalcButtonClick}
                />
              </div>
              <div className="col">
                <CalcButton
                  id="decimal"
                  text={ENTRIES.DECIMAL_POINT}
                  onClick={this.onCalcButtonClick}
                />
              </div>
            </div>
          </div>
          <div
            className={
              "container p-0 " +
              (window.innerHeight > window.innerWidth ? "col-12" : "col-5")
            }
          >
            <div className="row row-cols-3 m-0 g-2 p-0">{numButtons}</div>
          </div>
          <div className="container p-0 col-12">
            <div
              className={
                "row m-0 g-2 p-0 d-flex " +
                (window.innerWidth > window.innerHeight
                  ? "flex-row-reverse"
                  : "")
              }
            >
              <div
                className={
                  "" +
                  (window.innerHeight > window.innerWidth ? "col-4" : "col-5")
                }
              >
                <CalcButton
                  id="zero"
                  text={ENTRIES.NUMBERS.ZERO}
                  onClick={this.onCalcButtonClick}
                />
              </div>
              <div
                className={
                  "" +
                  (window.innerHeight > window.innerWidth ? "col-8" : "col-7")
                }
              >
                <CalcButton
                  id="equals"
                  text={ENTRIES.EQUAL}
                  onClick={this.onCalcButtonClick}
                />
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Calculator;
