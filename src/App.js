import React, { Component } from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import { withTransition } from "./lib";
import "./App.css";

const NavBar = () => (
  <div>
    <NavLink to="/">Page One</NavLink>
    <NavLink to="/two">Page Two</NavLink>
    <NavLink to="/three">Page Three</NavLink>
  </div>
);

const One = () => (
  <div className="slide one">
    <div>One</div>
  </div>
);
const Two = () => (
  <div className="slide two">
    <div>Two</div>
  </div>
);
const Three = () => (
  <div className="slide three">
    <div>Three</div>
  </div>
);

class App extends Component {
  state = {
    effect: "fadeAndPop"
  };

  effects = [
    "drop",
    "fadeAndMove",
    "fadeAndPop",
    "moveIn",
    "pop",
    "scale",
    "zoom"
  ];

  changeEffect = event => {
    const effect = event.target.value;
    this.setState({ effect });
  };

  render() {
    const { effect } = this.state;

    const PlayOne = withTransition({ effect })(One);
    const PlayTwo = withTransition({ effect })(Two);
    const PlayThree = withTransition({ effect })(Three);

    return (
      <Router>
        <div className="App">
          <h1>▶️ Press Play</h1>
          <p>A simple transition library for React (and routers!)</p>
          Effect:
          <select value={this.state.effect} onChange={this.changeEffect}>
            {this.effects.map(effect => (
              <option
                value={effect}
                key={effect}
                checked={effect === this.state.effect}
              >
                {effect}
              </option>
            ))}
          </select>
          <hr />
          <NavBar />
          <hr />
          <Route path="/" exact component={PlayOne} />
          <Route path="/two" component={PlayTwo} />
          <Route path="/three" component={PlayThree} />
          <p>
            Made By <a href="https://jonquach.com">Q</a>
          </p>
        </div>
      </Router>
    );
  }
}

export default App;
