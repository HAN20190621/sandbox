import React from "react";
import "./styles.css";
//import Board from "./components/Board";
import Footer from "./components/Footer";
import About from "./components/About";
import AddPlayer from "./components/AddPlayer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//https://reactrouter.com/web/example/no-match

/* <AddPlayer />
<Switch>
  <Route exact path="/" component={Footer} />
  <Route path="/about" component={About} />
</Switch> */

export default function App() {
  return (
    <Router>
      <div className="container">
        <Route path="/about" component={About} />
        <Footer />
      </div>
    </Router>
  );
}
