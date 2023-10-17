import { Component } from "react";
import PropTypes from "prop-types";

class Time extends Component {
  render() {
    return (
      <div
        id={this.props.id}
        className="mb-3 mb-sm-4 d-flex flex-column align-items-center"
      >
        <div
          id={this.props.id + "-label"}
          className="text-center mb-2"
          role="label"
          style={{ fontSize: "0.85rem" }}
        >
          {this.props.label}
        </div>
        <div
          id={this.props.id + "-value"}
          className="text-center"
          aria-labelledby={this.props.id + "-label"}
        >
          <button
            type="button"
            id={this.props.id + "-decrement"}
            className="btn btn-outline-dark rounded-circle p-0 px-2"
            onClick={() => this.props.onDecrement()}
          >
            -
          </button>
          <span className="fw-bold align-middle">
            &nbsp;
            <span id={this.props.id + "-length"}>{this.props.value}</span>
            &nbsp;
          </span>
          <button
            type="button"
            id={this.props.id + "-increment"}
            className="btn btn-outline-dark rounded-circle p-0 px-2"
            onClick={() => this.props.onIncrement()}
          >
            +
          </button>
        </div>
      </div>
    );
  }
}

Time.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
};

export default Time;
