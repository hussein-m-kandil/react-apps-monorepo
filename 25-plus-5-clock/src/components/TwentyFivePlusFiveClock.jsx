import { Component, Fragment } from "react";
import Time from "./Time";
import Timer from "./Timer";

class TwentyFivePlusFiveClock extends Component {
  constructor(props) {
    super(props);
    // Fields
    this.breakId = "break";
    this.sessionId = "session";
    this.defaultBreakTime = 5;
    this.defaultSessionTime = 25;
    this.currentCounter = null;
    // State
    this.state = {
      break: this.defaultBreakTime,
      session: this.defaultSessionTime,
      isSessionTime: true,
      timerIsOn: false,
      minutes: this.defaultSessionTime,
      seconds: 0,
      isTimeUp: false,
    };
    // This bindings
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.setMinutes = this.setMinutes.bind(this);
    this.resetClock = this.resetClock.bind(this);
    this.toggleTimer = this.toggleTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  increment(id) {
    this.setState((state) => {
      if (state.timerIsOn) {
        return {};
      } else {
        const newTime = {};
        newTime[id] = state[id] < 60 ? state[id] + 1 : state[id];
        return newTime;
      }
    });
    if (!this.state.timerIsOn) {
      this.setMinutes(id);
    }
  }

  decrement(id) {
    this.setState((state) => {
      if (state.timerIsOn) {
        return {};
      } else {
        const newTime = {};
        newTime[id] = state[id] > 1 ? state[id] - 1 : state[id];
        return newTime;
      }
    });
    if (!this.state.timerIsOn) {
      this.setMinutes(id);
    }
  }

  setMinutes(id) {
    if (
      (this.state.isSessionTime && id === this.sessionId) ||
      (!this.state.isSessionTime && id === this.breakId)
    ) {
      this.setState((state) => ({ minutes: state.session, seconds: 0 }));
    }
  }

  resetClock() {
    this.toggleTimer();
    this.setState({
      break: this.defaultBreakTime,
      session: this.defaultSessionTime,
      isSessionTime: true,
      minutes: this.defaultSessionTime,
      seconds: 0,
    });
  }

  toggleTimer() {
    if (this.currentCounter) {
      clearInterval(this.currentCounter);
      this.currentCounter = null;
    } else {
      this.countDown();
    }
    this.setState((state) => ({ timerIsOn: !state.timerIsOn }));
  }

  countDown() {
    this.currentCounter = setInterval(() => {
      this.setState((state) => {
        let minutes,
          seconds,
          isTimeUp = false;
        if (state.isTimeUp) {
          minutes = state.isSessionTime ? state.session : state.break;
          seconds = 0;
        } else {
          minutes = state.minutes;
          seconds = state.seconds;
        }
        const newSeconds = !state.isTimeUp ? (seconds + 59) % 60 : seconds;
        const newMinutes = newSeconds < 59 ? minutes : minutes - 1;
        if (newMinutes === 0 && newSeconds === 0) {
          isTimeUp = true;
        }
        return {
          minutes: newMinutes,
          seconds: newSeconds,
          isSessionTime: state.isTimeUp
            ? !state.isSessionTime
            : state.isSessionTime,
          isTimeUp,
        };
      });
    }, 1000);
  }

  render() {
    return (
      <Fragment>
        <div className="d-flex justify-content-around">
          <Time
            id={this.breakId}
            label="Break Length"
            value={this.state.break}
            onIncrement={() => this.increment(this.breakId)}
            onDecrement={() => this.decrement(this.breakId)}
          />
          <Time
            id={this.sessionId}
            label="Session Length"
            value={this.state.session}
            onIncrement={() => this.increment(this.sessionId)}
            onDecrement={() => this.decrement(this.sessionId)}
          />
        </div>
        <Timer
          label={this.state.isSessionTime ? this.sessionId : this.breakId}
          minutes={this.state.minutes}
          seconds={this.state.seconds}
          onToggleTimer={this.toggleTimer}
          onResetClock={this.resetClock}
        />
      </Fragment>
    );
  }
}

export default TwentyFivePlusFiveClock;
