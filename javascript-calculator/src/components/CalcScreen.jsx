import { Component } from "react";
import PropTypes from "prop-types";

class CalcScreen extends Component {
  render() {
    return (
      <div className="bg-dark rounded-2 text-light text-end p-2">
        <div
          className="text-secondary"
          style={{
            minHeight: "3rem",
            fontSize: "1.2rem",
            lineHeight: "1.2rem",
          }}
        >
          <span className="text-wrap text-break">
            {this.props.lastOps.length > 0
              ? this.props.lastOps +
                (this.props.solution ? "=" + this.props.currentOp : "")
              : "0"}
          </span>
        </div>
        <div
          className="d-flex flex-column justify-content-end"
          style={{
            minHeight: "4rem",
            fontSize: "2rem",
            lineHeight: "2rem",
          }}
        >
          <span id="display" className="text-wrap text-break">
            {this.props.currentOp.length > 0 ? this.props.currentOp : "0"}
          </span>
        </div>
      </div>
    );
  }
}

CalcScreen.propTypes = {
  lastOps: PropTypes.string.isRequired,
  currentOp: PropTypes.string.isRequired,
  solution: PropTypes.bool.isRequired,
};

export default CalcScreen;
