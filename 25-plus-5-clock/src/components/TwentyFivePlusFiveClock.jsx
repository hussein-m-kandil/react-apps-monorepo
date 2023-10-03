import { Component, Fragment } from "react";

class TwentyFivePlusFiveClock extends Component {
  render() {
    return (
      <Fragment>
        <div className="d-flex justify-content-around">
          <div id="break" className="d-flex flex-column align-items-center">
            <div id="break-label" className="text-center">
              Break Length
            </div>
            <div id="break-value" className="text-center">
              <button type="button" id="break-decrement">
                -
              </button>
              <span id="break-length">
                <strong>&nbsp;5&nbsp;</strong>
              </span>
              <button type="button" id="break-increment">
                +
              </button>
            </div>
          </div>
          <div id="session" className="d-flex flex-column align-items-center">
            <div id="session-label" className="text-center">
              Session Length
            </div>
            <div id="session-value" className="text-center">
              <button type="button" id="session-decrement">
                -
              </button>
              <span id="session-length">
                <strong>&nbsp;25&nbsp;</strong>
              </span>
              <button type="button" id="session-increment">
                +
              </button>
            </div>
          </div>
        </div>
        <div id="timer" className="text-center mx-auto">
          <label id="timer-label">Session</label>
          <div id="time-left">
            <strong>25:00</strong>
          </div>
          <button type="button" id="start-stop">
            Start/Stop
          </button>
          <button type="button" id="reset">
            Reset
          </button>
        </div>
      </Fragment>
    );
  }
}

export default TwentyFivePlusFiveClock;
