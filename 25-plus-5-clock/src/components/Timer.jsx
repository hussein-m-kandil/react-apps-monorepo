import { Component } from "react";
import PropTypes from "prop-types";

class Timer extends Component {
  render() {
    return (
      <div id="timer" className="text-center mx-auto">
        <label id="timer-label">
          {this.props.label[0].toUpperCase() + this.props.label.slice(1)}
        </label>
        <div id="time-left" className="fw-bold">
          {(this.props.minutes < 10 ? "0" : "") +
            this.props.minutes +
            ":" +
            (this.props.seconds < 10 ? "0" : "") +
            this.props.seconds}
        </div>
        <button
          type="button"
          id="start_stop"
          onClick={() => this.props.onToggleTimer()}
        >
          Start/Stop
        </button>
        <button
          type="button"
          id="reset"
          onClick={() => this.props.onResetClock()}
        >
          Reset
        </button>
      </div>
    );
  }
}

Timer.propTypes = {
  label: PropTypes.string.isRequired,
  minutes: PropTypes.number.isRequired,
  seconds: PropTypes.number.isRequired,
  onToggleTimer: PropTypes.func.isRequired,
  onResetClock: PropTypes.func.isRequired,
};

export default Timer;
