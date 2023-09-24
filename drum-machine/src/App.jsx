import { Component } from "react";
import DrumButton from "./component/DrumButton";

class App extends Component {
  constructor(props) {
    super(props);
    this.ASSETS_PATH = "/src/assets/";
    this.drums = [
      { keyName: "Q", drumName: "Heater-1", fileName: "Heater-1.mp3" },
      { keyName: "W", drumName: "Heater-2", fileName: "Heater-2.mp3" },
      { keyName: "E", drumName: "Heater-3", fileName: "Heater-3.mp3" },
      { keyName: "A", drumName: "Heater-4", fileName: "Heater-4.mp3" },
      { keyName: "S", drumName: "Clap", fileName: "Clap.mp3" },
      { keyName: "D", drumName: "Open-HH", fileName: "Open-HH.mp3" },
      { keyName: "Z", drumName: "Kick-n'-Hat", fileName: "Kick-n-Hat.mp3" },
      { keyName: "X", drumName: "Kick", fileName: "Kick.mp3" },
      { keyName: "C", drumName: "Closed-HH", fileName: "Closed-HH.mp3" },
    ];
  }

  componentDidMount() {
    document.addEventListener("keydown", (event) => {
      event.preventDefault();
      switch (event.key) {
        case "q":
        case "Q":
        case "ض":
          document.getElementById("Q")?.play();
          break;
      }
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <div
          className="row m-auto mt-5
          col-11 col-sm-10 col-md-9 col-lg-7 col-xl-6 col-xxl-5"
        >
          <div
            id="drum-machine"
            className="d-flex flex-md-row justify-content-between"
          >
            {this.drums.map((drum) => {
              return (
                <DrumButton
                  key={drum.keyName}
                  keyName={drum.keyName}
                  filePath={this.ASSETS_PATH + drum.fileName}
                />
              );
            })}
          </div>
          <div id="display"></div>
        </div>
      </div>
    );
  }
}

export default App;
