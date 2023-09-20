import React from "react";
import PropTypes from "prop-types";
import { FaTwitter, FaXTwitter } from "react-icons/fa6";

export class TwitterButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const encodedQuote = encodeURI(this.props.quoteText);
    return (
      <button
        type="button"
        className={"btn btn-" + this.props.color + " btn-lg rounded-1"}
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
