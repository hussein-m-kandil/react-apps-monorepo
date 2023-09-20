import React from "react";
import { COLORS } from "./colors";
import Quote from "./components/Quote";
import FadeIn from "react-fade-in";

export class App extends React.Component {
  constructor(props) {
    super(props);
    // Bootstrap color classes
    this.colors = [...COLORS];
    // Initiate the local state
    this.state = {
      counter: 1,
      quote: {
        text: "Test Quote",
        author: "Unknown",
      },
      color: "light",
    };
    // Bind custom methods with this
    this.setRandomColor = this.setRandomColor.bind(this);
  }

  setRandomColor() {
    let randomNumber;
    let newColor;
    do {
      randomNumber = Math.floor(Math.random() * this.colors.length);
      newColor = this.colors[randomNumber % this.colors.length];
    } while (newColor == this.state.color);
    this.setState({ color: newColor });
  }

  render() {
    return (
      <div
        className={"container-fluid bg-" + this.state.color}
        style={{ minHeight: "100vh", minWidth: "100%" }}
      >
        <div className="row position-absolute top-50 start-50 translate-middle w-100 m-0">
          <FadeIn transitionDuration={2000}>
            <div
              id="quote-box"
              style={{ minHeight: "35vh" }}
              className="bg-light col-11 col-lg-9 col-xl-7 mx-auto p-5 rounded-3
              d-flex flex-column justify-content-between"
            >
              <Quote
                color={this.state.color}
                changeColor={this.setRandomColor}
              />
            </div>
          </FadeIn>
        </div>
      </div>
    );
  }
}

export default App;
