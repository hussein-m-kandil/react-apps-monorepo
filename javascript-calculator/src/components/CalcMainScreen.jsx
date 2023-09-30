import { Component } from "react";
import PropTypes from "prop-types";

class CalcMainScreen extends Component {
  render() {
    return (
      <div
        className="bg-dark rounded-2 text-light text-end"
        style={{ minHeight: "7rem" }}
      >
        {this.props.text}
      </div>
    );
  }
}

CalcMainScreen.propTypes = {
  text: PropTypes.string.isRequired,
};

export default CalcMainScreen;
