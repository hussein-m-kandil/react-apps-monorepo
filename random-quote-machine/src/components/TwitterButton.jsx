import React from "react";
import PropTypes from "prop-types";
import { FaTwitter, FaXTwitter  } from "react-icons/fa6";

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
};

export default TwitterButton;
