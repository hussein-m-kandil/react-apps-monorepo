import { Component } from "react";
import PropTypes from "prop-types";

class Time extends Component {
  render() {
    return (
      <div id={this.props.id} className="d-flex flex-column align-items-center">
        <div id={this.props.id + "-label"} className="text-center">
          {this.props.label}
        </div>
        <div id={this.props.id + "-value"} className="text-center">
          <button
            type="button"
            id={this.props.id + "-decrement"}
            onClick={() => this.props.onDecrement()}
          >
            -
          </button>
          <span className="fw-bold">
            &nbsp;
            <span id={this.props.id + "-length"}>{this.props.value}</span>
            &nbsp;
          </span>
          <button
            type="button"
            id={this.props.id + "-increment"}
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
