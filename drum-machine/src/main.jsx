import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import "./index.scss";
import "./index.css";

const ASSETS_PATH = "/src/assets/";
const DRUMS_DATA = [
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

// eslint-disable-next-line react/no-deprecated
ReactDOM.render(
  <React.StrictMode>
    <App assetsPath={ASSETS_PATH} drumsData={DRUMS_DATA} />
  </React.StrictMode>,
  document.getElementById("root")
);
