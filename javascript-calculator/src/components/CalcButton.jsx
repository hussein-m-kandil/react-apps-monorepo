import { Component } from "react";
import PropTypes from "prop-types";

class CalcButton extends Component {
  render() {
    return (
      <button
        id={this.props.id}
        className="btn btn-dark w-100"
        style={{ fontSize: "x-large" }}
        onClick={() => this.props.onClick(this.props.text)}
      >
        {this.props.text}
      </button>
    );
  }
}

CalcButton.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CalcButton;
