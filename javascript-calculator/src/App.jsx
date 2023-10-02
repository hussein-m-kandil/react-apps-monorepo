import { Component, createRef } from "react";
import Calculator from "./components/Calculator";

class App extends Component {
  constructor(props) {
    super(props);
    this.calcRef = createRef();
    this.state = {
      windowHeight: window.innerHeight,
    };
    this.setCalcMarginTop = this.setCalcMarginTop.bind(this);
  }

  setCalcMarginTop() {
    const calcHeight = this.calcRef.current?.offsetHeight ?? 0;
    let paddingTopValue;
    if (calcHeight > 0) {
      paddingTopValue = Math.trunc((this.state.windowHeight - calcHeight) / 2);
      this.calcRef.current.style.paddingTop = "" + paddingTopValue + "px";
    } else {
      this.calcRef.current.classList.add("pt-3", "pt-sm-5");
    }
  }

  componentDidMount() {
    this.setCalcMarginTop();
    window.addEventListener("resize", () => {
      this.setState({
        windowHeight: window.innerHeight,
      });
    });
    screen.orientation.addEventListener("change", () => {
      this.setState({
        windowHeight: window.innerHeight,
      });
    });
  }

  componentDidUpdate() {
    this.setCalcMarginTop();
  }

  render() {
    return (
      <div className="container-fluid bg-warning">
        <div
          ref={this.calcRef}
          className={
            "row mx-auto px-1 pb-2 rounded-3 bg-warning " +
            "col-12 col-sm-11 col-md-10"
          }
        >
          <Calculator />
        </div>
      </div>
    );
  }
}

export default App;
