import { Component, createRef } from "react";
import { marked } from "marked";

class App extends Component {
  constructor(props) {
    super(props);
    this.previewDiv = createRef();
    this.state = {
      pureMarkdown: "# Marked in the browser\n\nRendered by **marked**.",
    };
    this.handleMarkdownInput = this.processMarkdown.bind(this);
  }

  convertNewLineToBr(text) {
    let newText = "";
    for (let i = 0; i < text.length; i++) {
      newText += text[i] === "\n" ? "<br>" : text[i];
    }
    return newText;
  }

  processMarkdown() {
    // const newLineBecomeBr = this.convertNewLineToBr(this.state.pureMarkdown);
    const newLineBecomeBr = this.state.pureMarkdown.replace("\r", "").replace("\n", "<br>");
    console.log(newLineBecomeBr);
    this.previewDiv.current.innerHTML = marked.parse(newLineBecomeBr);
  }

  componentDidMount() {
    this.processMarkdown();
  }

  componentDidUpdate() {
    this.processMarkdown();
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <textarea
            id="editor"
            rows={7}
            placeholder="Enter you markdown here ;)"
            onChange={(e) => this.setState({ pureMarkdown: e.target.value })}
            value={this.state.pureMarkdown}
          ></textarea>
        </div>
        <div id="preview" ref={this.previewDiv}></div>
      </div>
    );
  }
}

export default App;
