import { Component } from "react";
import PropTypes from "prop-types";

class RangeInput extends Component {
  render() {
    return (
      <div
        role="button"
        className={
          "rounded-bottom-2 px-1 mx-auto text-light text-start " +
          this.props.bgClass
        }
      >
        <label
          htmlFor="vol-range"
          className="form-label"
          style={{ fontSize: "smaller" }}
        >
          {this.props.label}
        </label>
        <input
          id="vol-range"
          type="range"
          className="form-range w-75 align-middle"
          min={this.props.min}
          max={this.props.max}
          step={this.props.step}
          defaultValue={this.props.defaultValue}
          onChange={(e) => this.props.onChange(e.target.value)}
        ></input>
      </div>
    );
  }
}

RangeInput.propTypes = {
  label: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  bgClass: PropTypes.string.isRequired,
  defaultValue: PropTypes.number,
  onChange: PropTypes.func,
};

export default RangeInput;
