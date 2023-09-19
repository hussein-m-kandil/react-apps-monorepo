import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="container">
      <div className="row">
        <div className="position-absolute top-50 start-50 translate-middle w-100">
          <h1>Counter App</h1>
          <button
            className="btn btn-dark text-danger fs-3 d-block mx-auto my-5 p-3"
            onClick={() => setCount((count) => count + 1)}
          >
            count is&nbsp;<span className="text-warning">{count}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
