import { Component, Fragment, createRef } from "react";
import PropTypes from "prop-types";
import TwitterButton from "./TwitterButton";
import { FaQuoteLeft } from "react-icons/fa6";
import { FALLBACK_QUOTES } from "../fallbackQuotes";
import { fadeIn } from "../fadeInOut";

export class Quote extends Component {
  constructor(props) {
    super(props);
    this.fallbackQuotes = FALLBACK_QUOTES;
    this.quoteDiv = createRef();
    this.quoteIcon = createRef();
    this.newQuoteBtn = createRef();
    this.state = {
      quote: {
        text: "",
        author: "",
      },
    };
    this.fetchNewQuote = this.fetchNewQuote.bind(this);
    this.getNewQuote = this.getNewQuote.bind(this);
    this.setQuoteFromFallback = this.setQuoteFromFallback.bind(this);
  }

  setQuoteFromFallback() {
    const randomIndex = Math.floor(Math.random() * this.fallbackQuotes.length);
    this.setState({ quote: this.fallbackQuotes[randomIndex] });
  }

  async fetchNewQuote() {
    try {
      const response = await fetch("https://api.quotable.io/random");
      if (response.ok) {
        const quote = await response.json();
        this.setState({ quote: { text: quote.content, author: quote.author } });
      } else {
        this.setQuoteFromFallback();
      }
    } catch (e) {
      console.log(e.message.toString());
      this.setQuoteFromFallback();
    }
  }

  getNewQuote() {
    this.setState({ quote: { text: "", author: "" } });
    this.newQuoteBtn.current.blur();
    setTimeout(() => {
      this.props.changeColor();
      this.fetchNewQuote();
    }, 1000);
  }

  componentDidMount() {
    this.getNewQuote();
  }

  componentDidUpdate() {
    if (this.quoteDiv.current) {
      fadeIn(this.quoteDiv.current, 5);
      this.quoteDiv.current = null;
    }
    if (this.quoteIcon.current) {
      fadeIn(this.quoteIcon.current, 5);
      this.quoteIcon.current = null;
    }
  }

  render() {
    return (
      <Fragment>
        {this.state.quote.text ? (
          <div ref={this.quoteDiv}>
            <h2
              className="p-0 text-start text-sm-center"
              id="text"
              style={{ transition: "color 3s", color: this.props.color }}
            >
              <FaQuoteLeft
                className="me-2 align-text-bottom"
                style={{ fontSize: "2.5rem" }}
              />
              <span className="align-bottom">{this.state.quote.text}</span>
            </h2>
            <p
              style={{ transition: "color 3s", color: this.props.color }}
              className="my-3 text-end"
              id="author"
            >
              - {this.state.quote.author}
            </p>
          </div>
        ) : (
          <h2 ref={this.quoteIcon} className="mb-5 text-center" id="text">
            <FaQuoteLeft
              style={{
                fontSize: "5rem",
                transition: "color 3s",
                color: this.props.color,
              }}
            />
          </h2>
        )}
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-end">
          <TwitterButton
            color={this.props.color}
            tweetText={`"${this.state.quote.text}"\n\n- ${this.state.quote.author}\n\n`}
            tweetHashtags={"quotes"}
          />
          <button
            type="button"
            id="new-quote"
            ref={this.newQuoteBtn}
            className="mt-3 btn btn-lg rounded-1 text-light"
            onClick={this.getNewQuote}
            onMouseOver={() => (this.newQuoteBtn.current.style.opacity = 0.75)}
            onMouseLeave={() => (this.newQuoteBtn.current.style.opacity = 1)}
            onFocus={() =>
              setTimeout(
                () => (this.newQuoteBtn.current.style.opacity = 1),
                1000
              )
            }
            style={{
              transition: "background-color 3s, border-color 3s",
              backgroundColor: this.props.color,
            }}
          >
            <a
              href="#"
              className="text-decoration-none link-light"
              onClick={(e) => e.preventDefault()}
            >
              New quote
            </a>
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
