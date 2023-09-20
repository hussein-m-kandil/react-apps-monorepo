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
            <h2
              className={"p-0 text-start text-sm-center text-" + this.props.color}
              id="text"
              style={{ transition: "color 3s" }}
            >
              <FaQuoteLeft
                className="me-2 align-text-bottom"
                style={{ fontSize: "2.2rem" }}
              />
              <span className="align-bottom">{this.state.quote.text}</span>
            </h2>
            <p
              style={{ transition: "color 3s" }}
              className={"my-3 text-end text-" + this.props.color}
              id="author"
            >
              - {this.state.quote.author}
            </p>
          </div>
        ) : (
          <h2 className={"mb-5 text-center text-" + this.props.color} id="text">
            <FaQuoteLeft style={{ fontSize: "5rem", transition: "color 3s" }} />
          </h2>
        )}
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-end">
          <TwitterButton
            color={this.props.color}
            quoteText={`"${this.state.quote.text}"\n\n- ${this.state.quote.author}\n\n`}
          />
          <button
            type="button"
            id="new-quote"
            className={
              "mt-3 btn btn-" +
              this.props.color +
              " btn-lg rounded-1 text-light"
            }
            onClick={this.getNewQuote}
            onMouseOver={(e) => e.target.style.opacity = 0.75}
            onMouseLeave={(e) => e.target.style.opacity = 1}
            style={{ transition: "background-color 3s, border-color 3s" }}
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
