import { Component, createRef } from "react";
import Calculator from "./components/Calculator";

class App extends Component {
  constructor(props) {
    super(props);
    this.calcRef = createRef();
    this.setCalcPaddingTop = this.setCalcPaddingTop.bind(this);
  }

  setCalcPaddingTop() {
    const calcHeight = this.calcRef.current?.offsetHeight ?? 0;
    if (calcHeight > 0) {
      const paddingTopValue = Math.round((window.innerHeight - calcHeight) / 2);
      this.calcRef.current.style.paddingTop = "" + paddingTopValue + "px";
    } else {
      this.calcRef.current.classList.add("pt-3", "pt-sm-5");
    }
  }

  componentDidMount() {
    // Set padding top to for the calculator
    this.setCalcPaddingTop();
    // Set event listeners to reload the page on 'window resize' & 'screen orientation'
    window.addEventListener("resize", () => {
      this.forceUpdate();
      window.location.reload();
    });
    screen.orientation.addEventListener("change", () => {
      this.forceUpdate();
      window.location.reload();
    });
  }

  componentDidUpdate() {
    this.setCalcPaddingTop();
  }

  render() {
    return (
      <div className="container-fluid bg-warning">
        <div
          ref={this.calcRef}
          className={
            "row mx-auto px-1 pb-2 rounded-3 bg-warning" +
            " col-12 col-sm-11 col-md-10"
          }
        >
          <Calculator />
        </div>
      </div>
    );
  }
}

export default App;
