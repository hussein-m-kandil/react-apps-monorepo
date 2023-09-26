import { Component } from "react";
import PropTypes from "prop-types";
import DrumPad from "./component/DrumPad";
import RangeInput from "./component/RangeInput";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDrumName: "",
    };
    this.drumPadsRefs = {};
    props.drumsData.forEach((drum) => {
      this.drumPadsRefs[drum.keyName] = null;
    });
    this.refDrumPad = this.refDrumPad.bind(this);
    this.setCurrentDrumName = this.setCurrentDrumName.bind(this);
  }

  setCurrentDrumName(drumName) {
    this.setState({ currentDrumName: drumName });
  }

  refDrumPad(drumPadKey, drumPadElement) {
    this.drumPadsRefs[drumPadKey] = drumPadElement;
  }

  componentDidMount() {
    document.addEventListener("keydown", (event) => {
      event.preventDefault();
      switch (event.key) {
        case "q":
        case "Q":
        case "ض":
          this.drumPadsRefs["Q"].current.click();
          break;
        case "w":
        case "W":
        case "ص":
          this.drumPadsRefs["W"].current.click();
          break;
        case "e":
        case "E":
        case "ث":
          this.drumPadsRefs["E"].current.click();
          break;
        case "a":
        case "A":
        case "ش":
          this.drumPadsRefs["A"].current.click();
          break;
        case "s":
        case "S":
        case "س":
          this.drumPadsRefs["S"].current.click();
          break;
        case "d":
        case "D":
        case "ب":
          this.drumPadsRefs["D"].current.click();
          break;
        case "z":
        case "Z":
        case "ئ":
          this.drumPadsRefs["Z"].current.click();
          break;
        case "x":
        case "X":
        case "ء":
          this.drumPadsRefs["X"].current.click();
          break;
        case "c":
        case "C":
        case "ؤ":
          this.drumPadsRefs["C"].current.click();
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
              defaultValue={this.defaultVolume}
              bgClass={"bg-danger"}
              onChange={this.changeVolume}
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
