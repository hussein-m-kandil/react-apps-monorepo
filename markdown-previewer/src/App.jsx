import { Component, createRef, Fragment } from "react";
import { marked } from "marked";

const INITIAL_MARKDOWN = `\
# Markdown Previewer

## What is Markdown?
> **Markdown** is a lightweight markup language for creating formatted text using a plain-text editor. \
John Gruber created Markdown in 2004 as a markup language that is easy to read in its source code form.

Visit [Wikipedia](https://en.wikipedia.org/wiki/Markdown), for more info.

## Inline code in Markdown
In JavaScript, \`console.log("Hello World!");\` outputs 'Hello World!' on the console screen.

## Code block in Markdown
\`\`\`
// In JavaScript, this code outputs 'Hello World' 10 times.
// Each time on a new line & followed by a number from 1 to 10.
for (let i = 0; i < 10; i++) {
  const currentCount = i + 1;
  console.log("Hello World " + currentCount);
}
\`\`\`

## Some of the Markdown variants
- GitHub Flavored Markdown
- Markdown Extra
- LiaScript

#### Best regards, Hussein Kandil
![A fantasy picture of me setting on the clouds.](https://mir-s3-cdn-cf.behance.net/project_modules/fs/0123ab25920475.5634cd0525408.jpg)
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.previewDiv = createRef();
    this.state = {
      pureMarkdown: INITIAL_MARKDOWN,
    };
    this.handleMarkdownInput = this.processMarkdown.bind(this);
  }

  processMarkdown() {
    let newLineBecomeBr = this.state.pureMarkdown; // Temp
    // newLineBecomeBr = this.state.pureMarkdown.replace(/\n/g, "<br>\n\n");
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
      <Fragment>
        <h1 style={{ margin: "2rem auto", textAlign: "center" }}>
          Markdown Previewer
        </h1>
        <textarea
          id="editor"
          rows={7}
          onChange={(e) => this.setState({ pureMarkdown: e.target.value })}
          value={this.state.pureMarkdown}
        ></textarea>
        <div id="preview" ref={this.previewDiv}></div>
      </Fragment>
    );
  }
}

export default App;
