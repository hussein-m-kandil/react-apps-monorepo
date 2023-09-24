import { Component, Fragment, createRef } from "react";
import PropTypes from "prop-types";

class DrumButton extends Component {
  constructor(props) {
    super(props);
    this.audio = createRef();
  }

  Drum() {
    this.audio.current.play();
  }

  render() {
    return (
      <Fragment>
        <button
          type="button"
          className="btn btn-primary d-block m-auto m-3"
          onClick={() => this.Drum()}
        >
          <audio
            id={this.props.keyName}
            className="clip"
            src={this.props.filePath}
            ref={this.audio}
            preload="auto"
          />
          {this.props.keyName}
        </button>
      </Fragment>
    );
  }
}

DrumButton.propTypes = {
  keyName: PropTypes.string.isRequired,
  filePath: PropTypes.string.isRequired,
};

export default DrumButton;
