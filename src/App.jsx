import React from 'react';
import './styles.css';
import Footer from './components/Footer';
import About from './components/About';
import Header from './components/Header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Players from './components/Players';

//https://reactrouter.com/web/example/no-match

/* <AddPlayer />
<Switch>
  <Route exact path="/" component={Footer} />
  <Route path="/about" component={About} />
</Switch> */

const App = () => {
  return (
    <Router>
      <div className="container">
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

export default App;
