import { Component, createRef, Fragment } from "react";
import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";

const INITIAL_MARKDOWN = `\
# Markdown Previewer

## What is Markdown?
> **Markdown** is a lightweight markup language for creating formatted text using a plain-text editor. \
John Gruber created Markdown in 2004 as a markup language that is easy to read in its source code form.
Visit [Wikipedia](https://en.wikipedia.org/wiki/Markdown), for more info.

## Inline code in Markdown
In JavaScript, \`console.log("Hello World!"); // Outputs: Hello World!\`



## Code block in Markdown
\`\`\`
for (let i = 0; i < 10; i++) {
  const currentCount = i + 1;
  console.log("Hello World " + currentCount);
}

/* Outputs:
* Hello World 1
* Hello World 2
* ...
* Hello World 10
*/
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

  replaceNewLinesWithHTMLBr(text) {
    let newText = "";
    let insideCodeElement = false;
    let angleBracketsRegex = /(<|>)/;
    for (let i = 0; i < text.length; i++) {
      if (text[i] === "`" && i !== text.length - 1 && text[i + 1] !== "`") {
        insideCodeElement = !insideCodeElement;
        newText += text[i];
        continue;
      }
      if (!insideCodeElement && text[i] === "\n") {
        if (i !== 0 && i !== text.length - 1) {
          if (text[i - 1] === "\n" && text[i + 1] === "\n") {
            newText += "<br>\n";
          } else if (text[i - 1] !== "\n" && text[i + 1] !== "\n") {
            if (
              !angleBracketsRegex.test(text[i - 1]) &&
              !angleBracketsRegex.test(text[i + 1])
            ) {
              newText += "<br>\n";
            } else {
              newText += text[i];
            }
          } else if (text[i - 1] === "\n" && text[i + 1] !== "\n") {
            if (
              !angleBracketsRegex.test(text[i - 1]) &&
              !angleBracketsRegex.test(text[i + 1])
            ) {
              newText += "<br>\n\n";
            } else {
              newText += text[i];
            }
          } else {
            newText += text[i];
          }
        } else {
          newText += "<br>\n\n";
        }
      } else {
        newText += text[i];
      }
    }
    return newText;
  }

  processMarkdown() {
    let newLineBecomeBr = this.state.pureMarkdown; // Temp
    newLineBecomeBr = this.replaceNewLinesWithHTMLBr(this.state.pureMarkdown);
    console.log(newLineBecomeBr);
    this.previewDiv.current.innerHTML = marked.parse(newLineBecomeBr);
  }

  highlightAnyCodeSyntax() {
    Array.from(document.getElementsByTagName("code")).forEach((code) => {
      code.innerHTML = hljs.highlightAuto(code.innerHTML).value;
    });
  }

  componentDidMount() {
    this.processMarkdown();
    this.highlightAnyCodeSyntax();
  }

  componentDidUpdate() {
    this.processMarkdown();
    this.highlightAnyCodeSyntax();
  }

  render() {
    return (
      <Fragment>
        <h1 style={{ margin: "1rem auto", textAlign: "center" }}>
          Markdown Previewer
        </h1>
        <label htmlFor="editor">Editor</label>
        <textarea
          id="editor"
          rows={7}
          onChange={(e) => this.setState({ pureMarkdown: e.target.value })}
          value={this.state.pureMarkdown}
        ></textarea>

        <label htmlFor="preview">Previewer</label>
        <div id="preview" ref={this.previewDiv}></div>
      </Fragment>
    );
  }
}

export default App;
