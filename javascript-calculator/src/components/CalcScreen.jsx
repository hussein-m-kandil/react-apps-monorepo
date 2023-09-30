import { Component } from "react";
import PropTypes from "prop-types";

class CalcScreen extends Component {
  render() {
    return (
      <div className="bg-dark rounded-2 text-light text-end p-2">
        <div
          className="text-secondary"
          style={{
            minHeight: "2rem",
            fontFamily: "digital-7-italic, monospace, sans-serif",
            fontSize: "1rem",
            lineHeight: "1rem",
          }}
        >
          <span className="text-wrap text-break overflow-auto">
            {this.props.ops}
          </span>
        </div>
        <div
          className="d-flex flex-column justify-content-end"
          style={{
            minHeight: "5rem",
            fontFamily: "digital-7, monospace, sans-serif",
            fontSize: "2.5rem",
            lineHeight: "2.5rem",
          }}
        >
          <span className="text-wrap text-break overflow-auto">
            {this.props.text}
          </span>
        </div>
      </div>
    );
  }
}

CalcScreen.propTypes = {
  ops: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default CalcScreen;
