import { Component } from "react";
import PropTypes from "prop-types";

class RangeInput extends Component {
  render() {
    return (
      <div
        role="button"
        className={
          "rounded-bottom-2 px-2 mx-auto " +
          "d-flex justify-content-center align-items-center " +
          (this.props.bgClass ?? "")
        }
      >
        <label
          htmlFor="vol-range"
          className="form-label text-light text-center d-block my-0 mx-auto"
          style={{ fontSize: this.props.fontSize ?? "normal" }}
        >
          {this.props.label}
        </label>
        <input
          type="range"
          className="form-range d-block my-0 mx-auto p-2"
          min={this.props.min}
          max={this.props.max}
          step={this.props.step}
          value={this.props.value ?? this.props.max}
          onChange={(e) => this.props.onChange?.(e.target.value)}
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
  bgClass: PropTypes.string,
  value: PropTypes.number,
  fontSize: PropTypes.string,
  onChange: PropTypes.func,
};

export default RangeInput;
