import React, { Fragment } from "react";
import PropTypes from "prop-types";
import TwitterButton from "./TwitterButton";

export class Quote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 1,
      quote: {
        text: "Test Quote",
        author: "Unknown",
      },
    };
    this.fetchNewQuote = this.fetchNewQuote.bind(this);
  }

  fetchNewQuote() {
    this.setState((state, props) => {
      props.changeColor();
      return {
        counter: state.counter + 1,
      };
    });
  }

  render() {
    return (
      <Fragment>
        <div>
          <h1 className={"text-" + this.props.color} id="text">
            {this.state.quote.text + " " + this.state.counter}
          </h1>
          <p className={"text-center mt-5 text-" + this.props.color} id="author">
            By {this.state.quote.author + "_" + this.state.counter}
          </p>
        </div>
        <div className="d-flex justify-content-around align-items-end">
          <TwitterButton color={this.props.color} />
          <button
            type="button"
            id="new-quote"
            className={"btn btn-outline-" + this.props.color}
            onClick={this.fetchNewQuote}
            onMouseOver={(e) => e.target.classList.add("text-dark")}
            onMouseOut={(e) => e.target.classList.remove("text-dark")}
          >
            New quote
          </button>
        </div>
      </Fragment>
    );
  }
}

Quote.propTypes = {
  color: PropTypes.string.isRequired,
  changeColor: PropTypes.func.isRequired,
};

export default Quote;
