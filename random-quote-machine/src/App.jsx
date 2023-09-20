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

  getRandomColor() {
    const digits = "0123456789abcdef";
    let hexColor = "#";
    for (let i = 0; i < 6 ;i++) {
      hexColor += digits[Math.floor(Math.random() * digits.length)];
    }
    return hexColor;
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
        style={{
          minHeight: "100vh",
          minWidth: "100%",
          transition: "background-color 3s",
        }}
      >
        <div className="row position-absolute top-50 start-50 translate-middle w-100 m-0">
          <FadeIn transitionDuration={3000}>
            <div
              id="quote-box"
              style={{
                minHeight: "35vh",
                transition: "width 3s, height 3s, box-size 3s, block-size 3s, resize 3s",
              }}
              className="bg-light col-11 col-sm-10 col-md-8 col-lg-7 col-xl-6 col-xxl-5 
                mx-auto p-4 pb-5 rounded-3 m-5
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
