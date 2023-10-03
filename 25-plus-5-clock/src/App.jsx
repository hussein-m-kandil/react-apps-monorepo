import { Component } from "react";
import TwentyFivePlusFiveClock from "./components/TwentyFivePlusFiveClock";

class App extends Component {
  render() {
    return (
      <div className="container m-0 p-0">
        <div className="row m-0 p-0">
          <TwentyFivePlusFiveClock />
        </div>
      </div>
    );
  }
}

export default App;
