import { Component } from "react";
import PropTypes from "prop-types";

class CalcButton extends Component {
  render() {
    return (
      <button
        className="btn btn-dark w-100"
        style={{ minHeight: "4rem", minWidth: "2rem" }}
        onClick={() => this.props.onClick(this.props.text)}
      >
        {this.props.text}
      </button>
    );
  }
}

CalcButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CalcButton;
