import { Component, createRef } from "react";
import PropTypes from "prop-types";
import RangeInput from "./RangeInput";

class DrumPad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loop: false,
    };
    this.defaultVolume = 0.5;
    this.mainBgClass = "bg-dark";
    this.bgClasses = [
      "bg-danger",
      "bg-warning",
      "bg-success",
      "bg-info",
      "bg-primary",
    ];
    this.audio = createRef();
    this.pad = createRef();
    this.drum = this.drum.bind(this);
    this.changeVolume = this.changeVolume.bind(this);
    this.coloredFlash = this.coloredFlash.bind(this);
  }

  coloredFlash() {
    const colorClass =
      this.bgClasses[Math.floor(Math.random() * this.bgClasses.length)];
    // Change pad's background from dark into any color (other than dark/light)
    this.pad.current.classList.remove(this.mainBgClass);
    this.pad.current.classList.add(colorClass);
    // Change pad's background back to the dark color
    setTimeout(() => {
      this.pad.current.classList.remove(colorClass);
      this.pad.current.classList.add(this.mainBgClass);
    }, 100);
  }

  componentDidMount() {
    this.props.refDrumPad(this.props.drumKey, this.pad);
    this.audio.current.volume = this.defaultVolume;
    // Colored flash
    this.audio.current.addEventListener("play", this.coloredFlash);
    this.audio.current.addEventListener("seeked", this.coloredFlash);
  }

  drum() {
    // Set the current drum name
    this.props.setCurrentDrumName(this.props.drumName);
    // If playing, then: back to beginning, else: play
    if (this.audio.current.currentTime > 0.0) {
      this.audio.current.fastSeek(0.0);
    }
    this.audio.current.play();
    // Reset the current drum name
    setTimeout(() => this.props.setCurrentDrumName(""), 500);
  }

  changeVolume(val) {
    this.audio.current.volume = val >= 0 && val <= 1 ? val : 0.5;
  }

  render() {
    return (
      <div>
        <div
          id={this.props.drumName}
          role="button"
          className={
            "drum-pad rounded-top-2 text-center text-light " + this.mainBgClass
          }
          style={{ padding: "25% 0" }}
          onClick={() => this.drum()}
          ref={this.pad}
        >
          <audio
            id={this.props.drumKey}
            className="clip"
            src={this.props.drumFile}
            ref={this.audio}
            preload="auto"
            loop={this.state.loop}
          />
          {this.props.drumKey}
        </div>
        <div
          role="button"
          className={
            "px-1 text-center " +
            (this.state.loop ? "text-light " : "text-secondary ") +
            this.mainBgClass
          }
          style={{ fontSize: "smaller" }}
          onClick={() => this.setState((state) => ({ loop: !state.loop }))}
        >
          Loop
        </div>
        <RangeInput
          label="Vol"
          min={0}
          max={1}
          step={0.1}
          defaultValue={this.defaultVolume}
          bgClass={this.mainBgClass}
          onChange={this.changeVolume}
        />
      </div>
    );
  }
}

DrumPad.propTypes = {
  drumKey: PropTypes.string.isRequired,
  drumName: PropTypes.string.isRequired,
  drumFile: PropTypes.string.isRequired,
  refDrumPad: PropTypes.func.isRequired,
  setCurrentDrumName: PropTypes.func,
};

export default DrumPad;
