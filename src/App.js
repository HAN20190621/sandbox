import React from "react";
import "./styles.css";
import Board from "./components/Board";

export default function App() {
  return (
    <div className="App">
      <Board key="1" />
      {/* <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2> */}
    </div>
  );
}
