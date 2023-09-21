import { Component, createRef } from "react";
import PropTypes from "prop-types";
import { FaTwitter, FaXTwitter } from "react-icons/fa6";

export class TwitterButton extends Component {
  constructor(props) {
    super(props);
    this.tweetBtn = createRef();
    this.tweetLink = createRef();
  }
  // TODO: Try Ref instead of 'document.getElementByID'
  render() {
    const encodedQuote = encodeURI(this.props.quoteText);
    return (
      <button
        id="tweet-btn"
        type="button"
        ref={this.tweetBtn}
        onClick={() => this.tweetLink.current.click()}
        onMouseOver={() => (this.tweetBtn.current.style.opacity = 0.75)}
        onMouseLeave={() => (this.tweetBtn.current.style.opacity = 1)}
        style={{
          transition: "background-color 3s, border-color 3s",
          backgroundColor: this.props.color,
        }}
        className="mt-3 btn btn-sm-lg rounded-1"
      >
        <a
          id="tweet-quote"
          href={
            "https://twitter.com/intent/tweet?hashtags=quotes&text=" +
            encodedQuote
          }
          target="_blank"
          rel="noreferrer"
          className="text-decoration-none link-light"
          ref={this.tweetLink}
        >
          <FaTwitter />
          &nbsp;|&nbsp;
          <span className="visually-hidden">Tweet this quote</span>
          <FaXTwitter />
        </a>
      </button>
    );
  }
}

TwitterButton.propTypes = {
  color: PropTypes.string.isRequired,
  quoteText: PropTypes.string.isRequired,
};

export default TwitterButton;
