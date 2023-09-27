import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import "./index.css";

const ASSETS_PATH = "./";
const DRUMS_DATA = [
  {
    keyName: "Q",
    drumName: "Heater-1",
    fileName: "Heater-1.mp3",
    fileURL: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    keyName: "W",
    drumName: "Heater-2",
    fileName: "Heater-2.mp3",
    fileURL: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  {
    keyName: "E",
    drumName: "Heater-3",
    fileName: "Heater-3.mp3",
    fileURL: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  {
    keyName: "A",
    drumName: "Heater-4",
    fileName: "Heater-4.mp3",
    fileURL: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  {
    keyName: "S",
    drumName: "Clap",
    fileName: "Clap.mp3",
    fileURL: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },
  {
    keyName: "D",
    drumName: "Open-HH",
    fileName: "Open-HH.mp3",
    fileURL: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },
  {
    keyName: "Z",
    drumName: "Kick-n'-Hat",
    fileName: "Kick-n-Hat.mp3",
    fileURL: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    keyName: "X",
    drumName: "Kick",
    fileName: "Kick.mp3",
    fileURL: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  {
    keyName: "C",
    drumName: "Closed-HH",
    fileName: "Closed-HH.mp3",
    fileURL: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
];

// eslint-disable-next-line react/no-deprecated
ReactDOM.render(
  <React.StrictMode>
    <App assetsPath={ASSETS_PATH} drumsData={DRUMS_DATA} />
  </React.StrictMode>,
  document.getElementById("root")
);
