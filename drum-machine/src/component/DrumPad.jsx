import { Component, createRef } from "react";
import PropTypes from "prop-types";
import RangeInput from "./RangeInput";

class DrumPad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loop: false,
      volume: props.defaultVol,
      playbackRate: props.defaultPlaybackRate,
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
    this.setPlaybackRate = this.setPlaybackRate.bind(this);
    this.flashColor = this.flashColor.bind(this);
  }

  componentDidMount() {
    // Set the pads objects needed in the parent
    this.props.refDrumPad(this.props.drumKey, {
      padRef: this.pad,
      getPadVol: () => this.state.volume,
      setPadVol: this.setVolume,
      getPadPlaybackRate: () => this.state.playbackRate,
      setPadPlaybackRate: this.setPlaybackRate,
    });
    // Set drum audio
    this.audio.current.volume = this.state.volume;
    // Colored flash & drum name
    this.audio.current.addEventListener("play", () => {
      this.props.setCurrentDrumName(this.props.drumName.replace("-", " "));
      this.flashColor();
    });
    this.audio.current.addEventListener("seeked", () => {
      setTimeout(() => {
        if (!this.audio.current.paused) {
          this.props.setCurrentDrumName(this.props.drumName.replace("-", " "));
        }
        this.flashColor();
      }, 100);
    });
    this.audio.current.addEventListener("seeking", () => {
      this.props.setCurrentDrumName("");
    });
    this.audio.current.addEventListener("pause", () => {
      this.props.setCurrentDrumName("");
    });
    this.audio.current.addEventListener("ended", () => {
      this.props.setCurrentDrumName("");
    });
  }

  setPlaybackRate(rate) {
    rate = Number(rate);
    rate = rate >= 0.25 && rate <= 3 ? rate : 1;
    this.setState({ playbackRate: rate });
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
    this.audio.current.playbackRate =
      this.audio.current.defaultPlaybackRate * this.state.playbackRate;
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
            src={this.props.drumURL}
            ref={this.audio}
            preload="auto"
            loop={this.state.loop}
          />
          {this.props.drumKey}
        </div>
        <div
          className={
            "w-100 d-flex px-1 px-sm-2 justify-content-between align-content-bottom " +
            this.mainBgClass
          }
        >
          <div
            role="button"
            className={this.state.loop ? "text-light " : "text-secondary "}
            style={{ fontSize: "smaller" }}
            onClick={() => {
              this.setState((state) => ({ loop: !state.loop }));
              if (this.audio.current.currentTime > 0.0) {
                this.audio.current.pause();
              }
            }}
          >
            Loop
          </div>
          <div
            className="w-50 text-light text-end"
            style={{ height: "min-content" }}
          >
            <span className="align-middle pb-2" style={{ fontSize: "x-small" }}>
              {this.state.playbackRate}x
            </span>
          </div>
        </div>
        <RangeInput
          label="V"
          fontSize="smaller"
          min={0}
          max={1}
          step={0.1}
          value={this.state.volume}
          bgClass={this.mainBgClass}
          onChange={this.setVolume}
        />
        <RangeInput
          label="R"
          fontSize="smaller"
          min={0.25}
          max={3}
          step={0.25}
          value={this.state.playbackRate}
          bgClass={this.mainBgClass}
          borderClass={"rounded-bottom-2"}
          onChange={this.setPlaybackRate}
        />
      </div>
    );
  }
}

DrumPad.propTypes = {
  drumKey: PropTypes.string.isRequired,
  drumName: PropTypes.string.isRequired,
  drumFile: PropTypes.string.isRequired,
  drumURL: PropTypes.string.isRequired,
  defaultVol: PropTypes.number.isRequired,
  defaultPlaybackRate: PropTypes.number.isRequired,
  refDrumPad: PropTypes.func.isRequired,
  setCurrentDrumName: PropTypes.func,
};

export default DrumPad;
