import { Component, Fragment } from "react";
import CalcButton from "./CalcButton";
import CalcScreen from "./CalcScreen";

class Calculator extends Component {
  constructor(props) {
    super(props);
    // State
    this.state = {
      lastOps: "1+2*3/3=3",
      operation: "1+2*3/4",
    };
    // This bindings to methods
    this.ClearAll = this.ClearAll.bind(this);
    this.clearFromOperation = this.clearFromOperation.bind(this);
    this.addToOperation = this.addToOperation.bind(this);
    this.onCalcButtonClick = this.onCalcButtonClick.bind(this);
  }

  ClearAll() {
    this.setState({ operation: "0", lastOps: "" });
  }

  clearFromOperation() {
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
      case "C":
        this.clearFromOperation();
        break;
      case "AC":
        this.ClearAll();
        break;
      default:
        this.addToOperation(value);
    }
  }

  render() {
    const numButtons = [];
    for (let i = 1; i < 10; i++) {
      const iString = i.toString();
      numButtons.push(
        <div key={iString} className="col-4">
          <CalcButton text={iString} onClick={this.onCalcButtonClick} />
        </div>
      );
    }
    return (
      <Fragment>
        <div className="row p-0 m-0 g-2">
          <div className="col-12">
            <CalcScreen text={this.state.operation} ops={this.state.lastOps} />
          </div>
          <div className="col-3">
            <CalcButton text="+" onClick={this.onCalcButtonClick} />
          </div>
          <div className="col-3">
            <CalcButton text="-" onClick={this.onCalcButtonClick} />
          </div>
          <div className="col-3">
            <CalcButton text="*" onClick={this.onCalcButtonClick} />
          </div>
          <div className="col-3">
            <CalcButton text="/" onClick={this.onCalcButtonClick} />
          </div>
          {numButtons}
          <div className="col-6">
            <CalcButton text="0" onClick={this.onCalcButtonClick} />
          </div>
          <div className="col-6">
            <CalcButton text="=" onClick={this.onCalcButtonClick} />
          </div>
          <div className="col-4">
            <CalcButton text="." onClick={this.onCalcButtonClick} />
          </div>
          <div className="col-4">
            <CalcButton text="C" onClick={this.onCalcButtonClick} />
          </div>
          <div className="col-4">
            <CalcButton text="AC" onClick={this.onCalcButtonClick} />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Calculator;
