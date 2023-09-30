import { Component } from "react";
import Calculator from "./components/Calculator";

class App extends Component {
  render() {
    return (
      <div className="container">
        <div
          className={
            "row mt-5 mb-3 mx-auto pb-1 rounded-3 bg-warning " +
            "col-12 col-sm-10 col-md-8 col-md-6 col-lg-4"
          }
        >
          <Calculator />
        </div>
      </div>
    );
  }
}

export default App;
