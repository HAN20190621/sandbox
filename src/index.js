import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";

//import App from "./App";

import Game from "./components/Game";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>,
  rootElement
);
