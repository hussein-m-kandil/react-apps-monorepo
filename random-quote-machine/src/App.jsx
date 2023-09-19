import React from "react";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.colors = [
      "secondary",
      "danger",
      "warning",
      "success",
      "primary",
      "info",
    ];
    this.state = {
      counter: 1,
      quote: {
        text: "Test Quote",
        author: "Unknown",
      },
      color: this.getRandomColor(),
    };
    this.fetchNewQuote = this.fetchNewQuote.bind(this);
    this.getRandomColor = this.getRandomColor.bind(this);
  }

  getRandomColor() {
    let randomNumber = Math.floor(Math.random() * 10);
    return this.colors[randomNumber % this.colors.length];
  }

  fetchNewQuote() {
    this.setState((state) => {
      let newColor;
      do {
        newColor = this.getRandomColor();
      } while (newColor == state.color);
      return {
        counter: state.counter + 1,
        color: newColor,
      };
    });
  }

  render() {
    return (
      <div
        className={"container-fluid bg-" + this.state.color}
        style={{ minHeight: "100vh", minWidth: "100%" }}
      >
        <div className="row position-absolute top-50 start-50 translate-middle w-100 m-0">
          <div
            id="quote-box"
            style={{ minHeight: "50vh" }}
            className="bg-light col-10 col-lg-8 col-xl-6 mx-auto p-5 rounded-5
              d-flex flex-column justify-content-between"
          >
            <div>
              <h1 className={"text-" + this.state.color} id="text">
                {this.state.quote.text + " " + this.state.counter}
              </h1>
              <p className={"text-" + this.state.color} id="author">
                By {this.state.quote.author + "_" + this.state.counter}
              </p>
            </div>
            <div className="d-flex justify-content-between">
              <button
                type="button"
                className={"btn btn-outline-" + this.state.color}
                onMouseOver={() =>
                  document
                    .getElementById("tweet-quote")
                    .classList.add("text-dark")
                }
                onMouseOut={() =>
                  document
                    .getElementById("tweet-quote")
                    .classList.remove("text-dark")
                }
              >
                <a
                  id="tweet-quote"
                  href="#"
                  target="_blank"
                  className={"text-decoration-none text-" + this.state.color}
                  onMouseOver={() =>
                    document
                      .getElementById("tweet-quote")
                      .classList.add("text-dark")
                  }
                  onMouseOut={() =>
                    document
                      .getElementById("tweet-quote")
                      .classList.remove("text-dark")
                  }
                >
                  <i className="bi bi-twitter"></i>
                  &nbsp;|&nbsp;
                  <span className="visually-hidden">Tweet this quote</span>
                  <i className="bi bi-twitter-x"></i>
                </a>
              </button>
              <button
                type="button"
                id="new-quote"
                className={"btn btn-outline-" + this.state.color}
                onClick={this.fetchNewQuote}
                onMouseOver={(e) => e.target.classList.add("text-dark")}
                onMouseOut={(e) => e.target.classList.remove("text-dark")}
              >
                New quote
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
