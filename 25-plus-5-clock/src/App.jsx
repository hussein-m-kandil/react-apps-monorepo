import { Component } from "react";
import TwentyFivePlusFiveClock from "./components/TwentyFivePlusFiveClock";

class App extends Component {
  render() {
    return (
      <div className="container m-0 p-0 m-auto p-auto">
        <div className="row m-0 p-0 m-auto p-auto">
          <TwentyFivePlusFiveClock />
        </div>
      </div>
    );
  }
}

export default App;
