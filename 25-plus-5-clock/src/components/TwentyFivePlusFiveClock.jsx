import { Component, Fragment, createRef } from "react";
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
    this.beepRef = createRef();
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
    this.stopBeepAudio = this.stopBeepAudio.bind(this);
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
    // Clear counter interval
    if (this.currentCounter) {
      clearInterval(this.currentCounter);
      this.currentCounter = null;
    }
    // Rewind the beep audio
    this.stopBeepAudio();
    // Reset the state
    this.setState({
      break: this.defaultBreakTime,
      session: this.defaultSessionTime,
      isSessionTime: true,
      timerIsOn: false,
      minutes: this.defaultSessionTime,
      seconds: 0,
      isTimeUp: false,
    });
  }

  toggleTimer() {
    // If there is a counter interval, then, clear it and stop beep audio,
    // Otherwise, start countdown
    if (this.currentCounter) {
      clearInterval(this.currentCounter);
      this.currentCounter = null;
      this.stopBeepAudio();
    } else {
      this.countDown();
    }
    // reset
    this.setState((state) => ({ timerIsOn: !state.timerIsOn }));
  }

  countDown() {
    this.currentCounter = setInterval(() => {
      this.setState((state) => {
        let minutes,
          seconds,
          isTimeUp = false;
        if (state.isTimeUp) {
          // The flag (isSessionTime) changes with the first round of the time,
          // which means it is still indicating to the last time (which is up now)
          // So, if it is "session" time, that means, we was in session time
          // and hence we need to start "break" time (the opposite) now.
          minutes = state.isSessionTime ? state.break : state.session;
          seconds = 0;
        } else {
          minutes = state.minutes;
          seconds = state.seconds;
        }
        const newSeconds = state.isTimeUp ? seconds : (seconds + 59) % 60;
        // If isTimeUp, then newSeconds is '0' (Zero),
        // So new time's minutes present unchanged for 1 second (till the next time).
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

  stopBeepAudio() {
    if (this.beepRef.current) {
      this.beepRef.current.pause();
      this.beepRef.current.currentTime = 0.0;
    }
  }

  componentDidUpdate() {
    // If Time is up, Rewind the beep audio and play it.
    if (this.state.isTimeUp && this.beepRef.current) {
      this.beepRef.current.play();
    }
  }

  componentDidMount() {
    this.beepRef.current?.addEventListener(
      "ended",
      (e) => (e.target.currentTime = 0)
    );
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
        <audio
          id="beep"
          ref={this.beepRef}
          src="https://cdn.pixabay.com/audio/2022/03/15/audio_9b025c02ff.mp3"
          preload="auto"
          crossOrigin="anonymous"
        />
      </Fragment>
    );
  }
}

export default TwentyFivePlusFiveClock;
