import React, { Fragment } from "react";
import PropTypes from "prop-types";
import TwitterButton from "./TwitterButton";
import { FaQuoteLeft } from "react-icons/fa6";

export class Quote extends React.Component {
  constructor(props) {
    super(props);
    this.LOCAL_QUOTES_KEY = "quotes";
    this.state = {
      quote: {
        text: "",
        author: "",
      },
    };
    this.getNewQuote = this.getNewQuote.bind(this);
  }

  async fetchNewQuotesJSON() {
    try {
      const response = await fetch("https://api.quotable.io/random");
      if (response.ok) {
        const quote = await response.json();
        this.setState({ quote: { text: quote.content, author: quote.author } });
      } else {
        return null;
      }
    } catch (e) {
      console.log(e.message.toString());
      return null;
    }
  }

  getNewQuote() {
    setTimeout(() => {
      this.props.changeColor();
      this.fetchNewQuotesJSON();
    }, 500);
  }

  componentDidMount() {
    this.getNewQuote();
  }

  render() {
    return (
      <Fragment>
        {this.state.quote.text ? (
          <div>
            <h1
              className={"p-0 text-center text-" + this.props.color}
              id="text"
            >
              <FaQuoteLeft
                style={{ fontSize: "2rem" }}
                className="me-2 align-top"
              />
              {this.state.quote.text}
            </h1>
            <p className={"my-3 text-end text-" + this.props.color} id="author">
              - {this.state.quote.author}
            </p>
          </div>
        ) : (
          <h1 className={"mb-5 text-center text-" + this.props.color} id="text">
            <FaQuoteLeft style={{ fontSize: "3rem" }} />
          </h1>
        )}
        <div className="d-flex justify-content-between align-items-end">
          <TwitterButton
            color={this.props.color}
            quoteText={`"${this.state.quote.text}"\n\n- ${this.state.quote.author}\n\n`}
          />
          <button
            type="button"
            id="new-quote"
            className={
              "btn btn-" + this.props.color + " btn-lg rounded-1 text-light"
            }
            onClick={this.getNewQuote}
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
