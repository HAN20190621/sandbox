import React from "react";
import ReactDOM from "react-dom";

//import App from "./App";

import Board from "./components/Board";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <Board />
  </React.StrictMode>,
  rootElement
);
