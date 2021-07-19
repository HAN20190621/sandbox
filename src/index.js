import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";

//import App from "./App";

import Square from "./components/Square";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <Square />
  </React.StrictMode>,
  rootElement
);
