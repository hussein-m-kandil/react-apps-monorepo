import { Component, Fragment } from "react";
import { marked } from "marked";
import "highlight.js/styles/github.css";
import hljs from "highlight.js/lib/common";

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

#### My image in Markdown ;)
![A fantasy picture of me setting on the clouds.](https://mir-s3-cdn-cf.behance.net/project_modules/fs/0123ab25920475.5634cd0525408.jpg)

###### Best regards, Hussein Kandil
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mdPreview: "",
    };
    this.handleMarkdownInput = this.processMarkdown.bind(this);
  }

  replaceNewLinesWithHTMLBr(text) {
    let newText = "";
    let insideCodeElement = false;
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
          } else if (text[i - 1] === "\n" && text[i + 1] !== "\n") {
            newText += "<br>\n\n";
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

  highlightAnyCodeSyntax() {
    Array.from(document.getElementsByTagName("code")).forEach((code) => {
      code.innerHTML =
        hljs?.highlightAuto(code.innerHTML).value ?? code.innerHTML;
    });
  }

  processMarkdown(markdown) {
    let newLineBecomeBr = markdown; // Temp
    newLineBecomeBr = this.replaceNewLinesWithHTMLBr(markdown);
    this.setState({ mdPreview: marked.parse(newLineBecomeBr) });
  }

  componentDidMount() {
    this.processMarkdown(INITIAL_MARKDOWN);
  }

  componentDidUpdate() {
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
          onChange={(e) => this.processMarkdown(e.target.value)}
          defaultValue={INITIAL_MARKDOWN}
        ></textarea>

        <label htmlFor="preview">Previewer</label>
        <div
          id="preview"
          dangerouslySetInnerHTML={{ __html: this.state.mdPreview }}
        />
      </Fragment>
    );
  }
}

export default App;
