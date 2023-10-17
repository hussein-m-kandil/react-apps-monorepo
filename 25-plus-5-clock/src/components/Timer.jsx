import { Component } from "react";
import PropTypes from "prop-types";

class Timer extends Component {
  render() {
    return (
      <div
        id="timer"
        className="mt-2 text-center mx-auto p-3 border border-secondary rounded"
      >
        <div
          id="timer-label"
          role="label"
          style={{
            fontWeight: "100",
            fontSize: "1.5rem",
            fontStyle: "italic",
          }}
        >
          {this.props.label[0].toUpperCase() + this.props.label.slice(1)}
        </div>
        <div className="my-2">
          <span
            id="time-left"
            className={
              "fw-bold align-middle" +
              (this.props.minutes < 1 ? " text-danger" : " text-dark")
            }
            style={{ fontSize: "1.5rem" }}
            aria-labelledby="timer-label"
          >
            {(this.props.minutes < 10 ? "0" : "") +
              this.props.minutes +
              ":" +
              (this.props.seconds < 10 ? "0" : "") +
              this.props.seconds}
          </span>
        </div>
        <div
          className={
            "d-flex flex-column flex-sm-row justify-content-center mb-2"
          }
        >
          <button
            type="button"
            id="start_stop"
            className="btn btn-outline-dark m-2"
            onClick={() => this.props.onToggleTimer()}
          >
            {this.props.startAndStopText}
          </button>
          <button
            type="button"
            id="reset"
            className="btn btn-outline-dark m-2"
            onClick={() => this.props.onResetClock()}
          >
            Reset
          </button>
        </div>
      </div>
    );
  }
}

Timer.propTypes = {
  label: PropTypes.string.isRequired,
  minutes: PropTypes.number.isRequired,
  seconds: PropTypes.number.isRequired,
  startAndStopText: PropTypes.string.isRequired,
  onToggleTimer: PropTypes.func.isRequired,
  onResetClock: PropTypes.func.isRequired,
};

export default Timer;
