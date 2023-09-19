import React from "react";
import PropTypes from "prop-types";

export class TwitterButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button
        type="button"
        className={"btn btn-outline-" + this.props.color}
        onMouseOver={() =>
          document.getElementById("tweet-quote").classList.add("text-dark")
        }
        onMouseOut={() =>
          document.getElementById("tweet-quote").classList.remove("text-dark")
        }
      >
        <a
          id="tweet-quote"
          href="#"
          target="_blank"
          className={"text-decoration-none text-" + this.props.color}
          onMouseOver={() =>
            document.getElementById("tweet-quote").classList.add("text-dark")
          }
          onMouseOut={() =>
            document.getElementById("tweet-quote").classList.remove("text-dark")
          }
        >
          <i className="bi bi-twitter"></i>
          &nbsp;|&nbsp;
          <span className="visually-hidden">Tweet this quote</span>
          <i className="bi bi-twitter-x"></i>
        </a>
      </button>
    );
  }
}

TwitterButton.propTypes = {
  color: PropTypes.string.isRequired,
};

export default TwitterButton;
