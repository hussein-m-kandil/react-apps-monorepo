import { Component, createRef } from "react";
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
    this.clockRef = createRef();
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
    this.setClockPaddingTop = this.setClockPaddingTop.bind(this);
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
    if (this.state.isSessionTime && id === this.sessionId) {
      this.setState((state) => ({ minutes: state.session, seconds: 0 }));
    } else if (!this.state.isSessionTime && id === this.breakId) {
      this.setState((state) => ({ minutes: state.break, seconds: 0 }));
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

  setClockPaddingTop() {
    const clockHeight = this.clockRef.current?.offsetHeight ?? 0;
    if (clockHeight > 0) {
      const paddingTop = Math.ceil((window.innerHeight - clockHeight) / 2);
      this.clockRef.current.style.paddingTop = "" + paddingTop + "px";
    }
  }

  componentDidUpdate() {
    // If Time is up, Rewind the beep audio and play it.
    if (this.state.isTimeUp && this.beepRef.current) {
      this.beepRef.current.play();
    }
  }

  componentDidMount() {
    // Add event lister that rewind the beep audio at the end of playing
    if (this.beepRef.current) {
      this.beepRef.current.addEventListener(
        "ended",
        (e) => (e.target.currentTime = 0)
      );
      this.beepRef.current.volume = 1.0;
    }
    // Add event lister to set the clock's top padding,
    // on window resize & orientation change
    window.addEventListener("resize", () => this.setClockPaddingTop());
    screen.orientation.addEventListener("change", () =>
      this.setClockPaddingTop()
    );
    // Set clock's top padding
    this.setClockPaddingTop();
  }

  render() {
    return (
      <div
        ref={this.clockRef}
        className={"row m-0 mx-auto" + " col-10 col-md-8 col-xl-6"}
        style={{ padding: "1rem 0" }}
      >
        <div
          className="my-2 mb-sm-5 text-center text-dark"
          style={{ fontSize: "xxx-large" }}
        >
          25 + 5 Clock
        </div>
        <div className="d-flex justify-content-between">
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
          startAndStopText={this.currentCounter ? "Stop" : "Start"}
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
      </div>
    );
  }
}

export default TwentyFivePlusFiveClock;
