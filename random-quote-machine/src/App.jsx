import { Component } from "react";
import Quote from "./components/Quote";

export class App extends Component {
  constructor(props) {
    super(props);
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
    for (let i = 0; i < 6; i++) {
      hexColor += digits[Math.floor(Math.random() * digits.length)];
    }
    return hexColor;
  }

  setRandomColor() {
    let newColor;
    let newColorDec;
    const backgroundHex = "ffffff";
    const maxOkForegroundHex = parseInt(backgroundHex, 16) / 7;
    do {
      newColor = this.getRandomColor();
      newColorDec = parseInt(newColor.replace("#", ""), 16);
    } while (newColorDec > maxOkForegroundHex);
    this.setState({ color: newColor });
  }

  render() {
    return (
      <div
        className="container-fluid p-0 pt-3"
        style={{
          height: "100%",
          minHeight: "100vh",
          minWidth: "100%",
          transition: "background-color 3s",
          backgroundColor: this.state.color,
        }}
      >
        <div className="row mx-auto mt-0 mb-3">
          <div
            id="quote-box"
            style={{
              minHeight: "35vh",
              transition:
                "width 3s, height 3s, box-size 3s, block-size 3s, resize 3s, content 3s",
            }}
            className="bg-light col-11 col-sm-10 col-md-8 col-lg-7 col-xl-6 col-xxl-5 
                mx-auto p-4 pb-5 rounded-3 m-5
                d-flex flex-column justify-content-between"
          >
            <Quote color={this.state.color} changeColor={this.setRandomColor} />
          </div>
        </div>
        <div className="row mx-auto mt-auto mb-0">
          <div className="text-light text-center my-3">
            <a
              href="https://github.com/hussein-m-kandil/react-apps-monorepo/"
              target="_blank"
              rel="noreferrer"
              className="link-light"
            >
              By <em>Hussein Kandil</em>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
