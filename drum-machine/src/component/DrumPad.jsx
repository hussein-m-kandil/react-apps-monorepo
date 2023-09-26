import { Component, createRef } from "react";
import PropTypes from "prop-types";
import RangeInput from "./RangeInput";

class DrumPad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loop: false,
      volume: props.defaultVol,
    };
    // Background colors classes
    this.mainBgClass = "bg-dark";
    this.bgClasses = [
      "bg-danger",
      "bg-warning",
      "bg-success",
      "bg-info",
      "bg-primary",
    ];
    // Refs
    this.audio = createRef();
    this.pad = createRef();
    // This binds
    this.drum = this.drum.bind(this);
    this.setVolume = this.setVolume.bind(this);
    this.flashColor = this.flashColor.bind(this);
  }

  flashColor() {
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
    // Set the pads objects needed in the parent
    this.props.refDrumPad(this.props.drumKey, {
      padRef: this.pad,
      getPadVol: () => this.state.volume,
      padVolSetter: this.setVolume,
    });
    this.audio.current.volume = this.state.volume;
    // // Seek to the beginning on end
    // this.audio.current.addEventListener("ended", () =>
    //   this.audio.current.fastSeek(0.0)
    // );
    // Colored flash & drum name
    this.audio.current.addEventListener("play", () => {
      this.props.setCurrentDrumName(this.props.drumName.replace("-", " "));
      this.flashColor();
    });
    this.audio.current.addEventListener("seeked", () => {
      this.props.setCurrentDrumName("");
      this.flashColor();
      if (this.state.loop && !this.audio.current.paused) {
        setTimeout(() => {
          this.props.setCurrentDrumName(this.props.drumName.replace("-", " "));
        }, 100);
      }
    });
    this.audio.current.addEventListener("pause", () =>
      this.props.setCurrentDrumName("")
    );
  }

  drum() {
    // If playing, then: back to beginning, else: play
    if (this.audio.current.currentTime > 0.0) {
      this.audio.current.fastSeek(0.0);
    }
    this.audio.current.play();
  }

  setVolume(val) {
    val = Number(val);
    this.setState({ volume: val >= 0 && val <= 1 ? val : 0.5 });
  }

  componentDidUpdate() {
    this.audio.current.volume = this.state.volume;
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
          onClick={() => {
            this.setState((state) => ({ loop: !state.loop }));
            if (this.audio.current.currentTime > 0.0) {
              this.audio.current.pause();
              this.audio.current.fastSeek(0.0);
            }
          }}
        >
          Loop
        </div>
        <RangeInput
          label="Vol"
          fontSize="smaller"
          min={0}
          max={1}
          step={0.1}
          value={this.state.volume}
          bgClass={this.mainBgClass}
          onChange={this.setVolume}
        />
      </div>
    );
  }
}

DrumPad.propTypes = {
  drumKey: PropTypes.string.isRequired,
  drumName: PropTypes.string.isRequired,
  drumFile: PropTypes.string.isRequired,
  defaultVol: PropTypes.number.isRequired,
  refDrumPad: PropTypes.func.isRequired,
  setCurrentDrumName: PropTypes.func,
};

export default DrumPad;
