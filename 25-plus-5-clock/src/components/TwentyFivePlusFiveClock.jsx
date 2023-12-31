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
    this.playBeepJSAudioAsync = this.playBeepJSAudioAsync.bind(this);
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

  async playBeepJSAudioAsync() {
    const beep = new Audio("./alarm-clock-beep.mp3");
    beep.load();
    // Add event lister that rewind the beep audio at the end of playing
    beep.addEventListener("ended", (e) => (e.target.currentTime = 0));
    // Set volume
    beep.volume = 1.0;
    // Set playback rate
    beep.playbackRate = 2;
    beep.play();
    return beep;
  }

  stopBeepAudio() {
    if (this.beep) {
      if (this.beep.currentTime > 0.0) {
        this.beep.pause();
        this.beep.currentTime = 0.0;
      }
    } else if (this.beepRef.current) {
      if (this.beepRef.current.currentTime > 0.0) {
        this.beepRef.current.pause();
        this.beepRef.current.currentTime = 0.0;
      }
    }
  }

  setClockPaddingTop() {
    const clockHeight = this.clockRef.current?.offsetHeight ?? 0;
    if (clockHeight > 0) {
      const paddingTop = Math.ceil((window.innerHeight - clockHeight) / 2);
      this.clockRef.current.style.paddingTop = "" + paddingTop + "px";
    } else {
      this.clockRef.current?.classList.add("pt-4");
    }
  }

  componentDidUpdate() {
    // If Time is up, Rewind the beep audio and play it.
    if (this.state.isTimeUp) {
      document.defaultView.focus();
      /*
       * Use the audio API and fallback to HTML5 audio element.
       * I am trying to play audio asynchronously (as a microtask) in order to:
       * * Enforce the browser to play the audio even if the page is not in the current active tab,
       * * Or
       * * There is another audio is playing.
       */
      if (Audio) {
        this.playBeepJSAudioAsync()
          .then((beepObj) => (this.beep = beepObj))
          .catch((e) => console.log(`${e.name}: ${e.message}`));
      } else if (this.beepRef.current) {
        console.log("Not Audio API!");
        (async () => this.beepRef.current.play())().catch((e) =>
          console.log(`${e.name}: ${e.message}`)
        );
      }
    }
  }

  componentDidMount() {
    // Add event lister that rewind the beep audio at the end of playing
    if (this.beepRef.current) {
      this.beepRef.current.addEventListener(
        "ended",
        (e) => (e.target.currentTime = 0)
      );
      // Set volume
      this.beepRef.current.volume = 1.0;
      // Set playback rate
      this.beepRef.current.playbackRate = 2;
    }
    // Add event lister to set the clock's top padding,
    // on window resize & orientation change
    window.addEventListener("resize", this.setClockPaddingTop);
    screen.orientation.addEventListener("change", this.setClockPaddingTop);
    // Set clock's top padding
    this.setClockPaddingTop();
  }

  render() {
    return (
      <div
        ref={this.clockRef}
        className={"row m-0 mx-auto" + " col-10 col-md-8 col-xl-6"}
        style={{ padding: "1rem 0 auto 0" }}
      >
        <h1
          className="mb-3 text-center text-dark"
          style={{ fontSize: "2.5rem" }}
        >
          25 + 5 Clock
        </h1>
        <div className="mt-3 d-flex justify-content-between">
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
          preload="auto"
          src="./alarm-clock-beep.mp3"
          // src="https://cdn.pixabay.com/audio/2021/08/04/audio_c668156e64.mp3"
          // crossOrigin="anonymous"
        />
      </div>
    );
  }
}

export default TwentyFivePlusFiveClock;
