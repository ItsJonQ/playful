import React, { Component } from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import { withTransition } from "./lib";
import { effects } from "./lib/effects";
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
    effect: "swipe",
    direction: "right",
    duration: 500
  };

  effects = Object.keys(effects);
  directions = ["up", "down", "right", "left"];

  changeEffect = event => {
    const effect = event.target.value;
    this.setState({ effect });
  };

  changeDirection = event => {
    const direction = event.target.value;
    this.setState({ direction });
  };

  changeDuration = event => {
    const duration = parseInt(event.target.value, 10);
    this.setState({ duration });
  };

  render() {
    const PlayOne = withTransition({ ...this.state })(One);
    const PlayTwo = withTransition({ ...this.state })(Two);
    const PlayThree = withTransition({ ...this.state })(Three);

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
          {` | `}
          Direction:
          <select value={this.state.direction} onChange={this.changeDirection}>
            {this.directions.map(direction => (
              <option
                value={direction}
                key={direction}
                checked={direction === this.state.direction}
              >
                {direction}
              </option>
            ))}
          </select>
          {` | `}
          Duration:
          <input
            type="text"
            value={this.state.duration}
            onChange={this.changeDuration}
          />
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
