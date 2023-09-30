import { Component } from "react";
import Calculator from "./components/Calculator";

class App extends Component {
  render() {
    return (
      <div className="container">
        <div
          className={
            "row my-3 mx-auto p-1 pb-2 rounded-3 bg-warning " +
            "col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4"
          }
        >
          <Calculator />
        </div>
      </div>
    );
  }
}

export default App;
