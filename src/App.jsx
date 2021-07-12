import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from "./components/About";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Players from "./components/Players";
import debounce from "lodash/debounce";
import "./styles.css";

//https://reactrouter.com/web/example/no-match

const App = () => {
  const [coords, setCoords] = useState({});
  const appRef = useRef(null);

  const updateWindowCoords = () => {
    const rect = appRef.current.getBoundingClientRect();
    setCoords({
      left: rect.x + rect.width / 2, // add half the width of the button for centering
      top: rect.y + window.scrollY + 50 // add scrollY offset, as soon as getBountingClientRect takes on screen coords
    });
  };

  const updateCoords = debounce(updateWindowCoords, 100);

  useEffect(() => {
    window.addEventListener("resize", updateCoords);
    return () => window.removeEventListener("resize", updateCoords);
  }, [updateCoords]);

  return (
    <Router>
      <div ref={appRef} className="container" style={{ ...styles.app, coords }}>
        <Header title="tik-tak-toe" />
        <Switch>
          <Route path="/about" component={About} />
          <Route path="/players" component={Players} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
};

const styles = {
  app: {
    position: "absolute"
  }
  //width: 200,
  // transform: "translate(-100px, -100%)"
};

export default App;
