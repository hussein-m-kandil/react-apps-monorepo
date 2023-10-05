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
    const encodedTweet = encodeURI("text=" + this.props.tweetText);
    let tweetHashtags;
    if (this.props.tweetHashtags && this.props.tweetHashtags?.length > 0) {
      tweetHashtags = `hashtags=${this.props.tweetHashtags}&`;
    } else {
      tweetHashtags = "";
    }
    return (
      <button
        id="tweet-btn"
        type="button"
        ref={this.tweetBtn}
        onClick={(e) => {
          if (e.target === this.tweetBtn.current) {
            this.tweetLink.current.click();
          }
        }}
        onMouseOver={() => (this.tweetBtn.current.style.opacity = 0.75)}
        onMouseLeave={() => (this.tweetBtn.current.style.opacity = 1)}
        onFocus={() =>
          setTimeout(() => (this.tweetBtn.current.style.opacity = 1), 1000)
        }
        style={{
          transition: "background-color 3s, border-color 3s",
          backgroundColor: this.props.color,
        }}
        className="mt-3 btn btn-lg rounded-1"
      >
        <a
          id="tweet-quote"
          href={
            "https://twitter.com/intent/tweet?" + tweetHashtags + encodedTweet
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
  tweetText: PropTypes.string.isRequired,
  tweetHashtags: PropTypes.string,
};

export default TwitterButton;
