import { Component } from "react";
import PropTypes from "prop-types";
import DrumPad from "./component/DrumPad";
import RangeInput from "./component/RangeInput";

class App extends Component {
  constructor(props) {
    super(props);
    // State
    this.state = {
      currentDrumName: "",
      drumPadsObjects: {},
      mainVolume: 0.5,
      mainPlaybackRate: 1,
    };
    // This binds to methods
    this.refDrumPad = this.refDrumPad.bind(this);
    this.setCurrentDrumName = this.setCurrentDrumName.bind(this);
    this.setMainVolume = this.setMainVolume.bind(this);
    this.setMainPlaybackRate = this.setMainPlaybackRate.bind(this);
  }

  setMainPlaybackRate(rate) {
    rate = Number(rate);
    rate = rate >= 0.25 && rate <= 3 ? rate : 1;
    this.setState({ mainPlaybackRate: rate });
    // Change all of the drum pads' playback rates
    // Based on the pad objects in the state came from the 'DrumPad' components
    for (const drumKey in this.state.drumPadsObjects) {
      this.state.drumPadsObjects[drumKey].setPadPlaybackRate(rate);
    }
  }

  setMainVolume(vol) {
    vol = Number(vol);
    vol = vol >= 0 && vol <= 1 ? vol : 1;
    this.setState({ mainVolume: vol });
    // Change all of the drum pads' volumes
    // Based on the pad objects in the state came from the 'DrumPad' components
    for (const drumKey in this.state.drumPadsObjects) {
      this.state.drumPadsObjects[drumKey].setPadVol(vol);
    }
  }

  setCurrentDrumName(drumName) {
    this.setState({ currentDrumName: drumName });
  }

  refDrumPad(drumPadKey, drumPadObj) {
    this.setState((state) => {
      state.drumPadsObjects[drumPadKey] = drumPadObj;
    });
  }

  componentDidMount() {
    // Enable keyboard keys for drumming
    document.addEventListener("keydown", (event) => {
      event.preventDefault();
      switch (event.key) {
        case "q":
        case "Q":
          this.state.drumPadsObjects["Q"].padRef.current.click();
          break;
        case "w":
        case "W":
          this.state.drumPadsObjects["W"].padRef.current.click();
          break;
        case "e":
        case "E":
          this.state.drumPadsObjects["E"].padRef.current.click();
          break;
        case "a":
        case "A":
          this.state.drumPadsObjects["A"].padRef.current.click();
          break;
        case "s":
        case "S":
          this.state.drumPadsObjects["S"].padRef.current.click();
          break;
        case "d":
        case "D":
          this.state.drumPadsObjects["D"].padRef.current.click();
          break;
        case "z":
        case "Z":
          this.state.drumPadsObjects["Z"].padRef.current.click();
          break;
        case "x":
        case "X":
          this.state.drumPadsObjects["X"].padRef.current.click();
          break;
        case "c":
        case "C":
          this.state.drumPadsObjects["C"].padRef.current.click();
          break;
      }
    });
  }

  render() {
    return (
      <div className="container">
        <div
          id="drum-machine"
          className="row bg-secondary rounded-2 m-0 my-3 mt-md-4 mx-auto
          col-sm-11 col-md-10 col-lg-8 col-xl-6 col-xxl-5"
        >
          <div className={"col-12 col-md-8 row row-cols-3 g-2 pb-2 m-0"}>
            {this.props.drumsData.map((drum) => {
              return (
                <div key={drum.keyName} className="col">
                  <DrumPad
                    drumKey={drum.keyName}
                    drumName={drum.drumName}
                    drumFile={this.props.assetsPath + drum.fileName}
                    drumURL={drum.fileURL}
                    defaultVol={this.state.mainVolume}
                    defaultPlaybackRate={this.state.mainPlaybackRate}
                    refDrumPad={this.refDrumPad}
                    setCurrentDrumName={this.setCurrentDrumName}
                  />
                </div>
              );
            })}
          </div>
          <div className={"col-12 col-md-4 py-3 py-md-auto"}>
            <div
              className={
                "w-100 h-100 d-flex flex-column justify-content-center align-items-stretch"
              }
            >
              <div
                id="display"
                className="bg-dark w-100 mx-auto my-2"
                style={{ padding: "5% 0" }}
              >
                <span
                  style={{
                    display: "block",
                    height: "1.5rem",
                    margin: "auto",
                    textAlign: "center",
                    color: "white",
                  }}
                >
                  {this.state.currentDrumName}
                </span>
              </div>
              <div className="my-3 d-flex justify-content-between align-items-center">
                <RangeInput
                  label="Volume"
                  idForLabel="main-vol"
                  fontSize={"smaller"}
                  min={0}
                  max={1}
                  step={0.1}
                  value={this.state.mainVolume}
                  onChange={this.setMainVolume}
                />
                <div
                  className="text-light text-end"
                  style={{ width: "25%", fontSize: "smaller" }}
                >
                  {this.state.mainVolume}
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <RangeInput
                  label="Rate"
                  idForLabel="main-rate"
                  fontSize={"smaller"}
                  min={0.25}
                  max={3}
                  step={0.25}
                  value={this.state.mainPlaybackRate}
                  onChange={this.setMainPlaybackRate}
                />
                <div
                  className="text-light text-end"
                  style={{ width: "25%", fontSize: "smaller" }}
                >
                  {this.state.mainPlaybackRate + "x"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  assetsPath: PropTypes.string.isRequired,
  drumsData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default App;
