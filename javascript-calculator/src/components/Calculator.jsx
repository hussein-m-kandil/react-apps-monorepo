import { Component, Fragment } from "react";
import CalcButton from "./CalcButton";
import CalcMainScreen from "./CalcMainScreen";

class Calculator extends Component {
  constructor(props) {
    super(props);
    // State
    this.state = {
      mainScreenValue: "",
    };
    // This bindings to methods
    this.onCalcButtonClick = this.onCalcButtonClick.bind(this);
  }

  onCalcButtonClick(value) {
    this.setState((state) => ({
      mainScreenValue: state.mainScreenValue + value,
    }));
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
            <CalcMainScreen text={this.state.mainScreenValue} />
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
          <div className="col-8">
            <CalcButton text="0" onClick={this.onCalcButtonClick} />
          </div>
          <div className="col-4">
            <CalcButton text="." onClick={this.onCalcButtonClick} />
          </div>
          <div className="col-4">
            <CalcButton text="AC" onClick={this.onCalcButtonClick} />
          </div>
          <div className="col-8">
            <CalcButton text="=" onClick={this.onCalcButtonClick} />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Calculator;
