import { Component } from "react";
import PropTypes from "prop-types";
import DrumPad from "./component/DrumPad";
import RangeInput from "./component/RangeInput";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDrumName: "",
      drumPadsObjects: {},
      mainVolume: 0.5,
    };
    this.refDrumPad = this.refDrumPad.bind(this);
    this.setCurrentDrumName = this.setCurrentDrumName.bind(this);
    this.setMainVolume = this.setMainVolume.bind(this);
  }

  setMainVolume(val) {
    val = Number(val);
    val = val >= 0 && val <= 1 ? val : 1;
    this.setState({ mainVolume: val });
    // Change all of the drum pads' volumes
    // Based on the pad objects in the state which came from the 'DrumPad' components
    const drumPads = this.state.drumPadsObjects;
    for (const drumKey in this.state.drumPadsObjects) {
      drumPads[drumKey].padVolSetter(val);
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
          className="row m-0 my-4 my-sm-5 mx-auto
          col-10 col-lg-8 col-xl-6 col-xxl-5"
        >
          <div className="col-12 col-md-8 bg-secondary row row-cols-3 g-2 pb-2 m-0">
            {this.props.drumsData.map((drum) => {
              return (
                <div key={drum.keyName} className="col">
                  <DrumPad
                    drumKey={drum.keyName}
                    drumName={drum.drumName}
                    drumFile={this.props.assetsPath + drum.fileName}
                    defaultVol={this.state.mainVolume}
                    refDrumPad={this.refDrumPad}
                    setCurrentDrumName={this.setCurrentDrumName}
                  />
                </div>
              );
            })}
          </div>
          <div
            className="bg-secondary col-12 col-md-4"
            style={{ padding: "5% 0" }}
          >
            <div
              id="display"
              className="bg-dark w-75 mx-auto my-2"
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
            <RangeInput
              label="Vol"
              min={0}
              max={1}
              step={0.1}
              value={this.state.mainVolume}
              onChange={this.setMainVolume}
            />
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
