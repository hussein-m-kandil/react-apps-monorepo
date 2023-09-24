import { Component, Fragment } from "react";
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import "highlight.js/styles/github.css";
import hljs from "highlight.js/lib/common";

const INITIAL_MARKDOWN = `\
# Markdown Previewer

## What is Markdown?
> **Markdown** is a lightweight markup language for creating formatted text using a plain-text editor. \
John Gruber created Markdown in 2004 as a markup language that is easy to read in its source code form.
Visit [Wikipedia](https://en.wikipedia.org/wiki/Markdown), for more info.  

&nbsp;  
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

###### Best regards, 
###### Hussein Kandil
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
      }
      if (
        !insideCodeElement &&
        text[i] === "\n" &&
        i !== 0 &&
        i !== text.length - 1 &&
        text[i - 1] === "\n" &&
        text[i + 1] === "\n"
      ) {
        newText += "<br>\n";
      } else if (
        !insideCodeElement &&
        text[i] === "\n" &&
        (i === 0 ||
          i === text.length - 1 ||
          (text[i - 1] === "\n" && text[i + 1] !== "\n"))
      ) {
        newText += "<br>\n\n";
      } else {
        newText += text[i];
      }
    }
    return newText;
  }

  processMarkdown(markdownString) {
    const mdStringWithLineBreaks =
      this.replaceNewLinesWithHTMLBr(markdownString);
    // Create reference instance configured with marked-highlight
    const marked = new Marked(
      markedHighlight({
        langPrefix: "hljs language-",
        highlight(code) {
          // Use auto highlight instead of specific language technique @marked-highlight docs
          return hljs?.highlightAuto(code).value;
        },
      })
    );
    // Create renderer to assign a custom '<a>' tag to link rendering
    const renderer = new marked.Renderer();
    renderer.link = (href, title, text) =>
      `<a target="_blank" rel="noreferrer" href="${href}" title="${
        title ?? text ?? ""
      }">${text}</a>`;
    // Set options for 'marked'
    marked.use({
      pedantic: false,
      gfm: true,
      breaks: true,
      renderer: renderer,
    });
    // Compile (parse code with 'marked')
    const parsed = marked.parse(mdStringWithLineBreaks);
    this.setState({
      mdPreview: parsed,
    });
  }

  componentDidMount() {
    this.processMarkdown(INITIAL_MARKDOWN);
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
        <h6 style={{ margin: "2rem auto", textAlign: "center" }}>
          <a
            href="https://github.com/hussein-m-kandil/react-apps-monorepo/"
            title="My GitHub account"
            target="_blank"
            rel="noreferrer"
            className="link-light"
            style={{ textDecoration: "none", color: "black" }}
          >
            By <em>Hussein Kandil</em>
          </a>
        </h6>
      </Fragment>
    );
  }
}

export default App;
