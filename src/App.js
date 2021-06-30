import React from "react";
import "./styles.css";
//import Board from "./components/Board";
import Footer from "./components/Footer";
import About from "./components/About";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Footer} />
          <Route path="/about" component={About} />
        </Switch>
      </div>
    </Router>
  );
}
