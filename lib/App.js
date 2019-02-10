"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _lib = require("./lib");

var _effects = require("./lib/effects");

require("./App.css");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const NavBar = () => _react.default.createElement("div", null, _react.default.createElement(_reactRouterDom.NavLink, {
  to: "/"
}, "Page One"), _react.default.createElement(_reactRouterDom.NavLink, {
  to: "/two"
}, "Page Two"), _react.default.createElement(_reactRouterDom.NavLink, {
  to: "/three"
}, "Page Three"));

const One = () => _react.default.createElement("div", {
  className: "slide one"
}, _react.default.createElement("div", null, "One"));

const Two = () => _react.default.createElement("div", {
  className: "slide two"
}, _react.default.createElement("div", null, "Two"));

const Three = () => _react.default.createElement("div", {
  className: "slide three"
}, _react.default.createElement("div", null, "Three"));

class App extends _react.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      effect: "swipe",
      direction: "right",
      duration: 500
    };
    this.effects = Object.keys(_effects.effects);
    this.directions = ["up", "down", "right", "left"];

    this.changeEffect = event => {
      const effect = event.target.value;
      this.setState({
        effect
      });
    };

    this.changeDirection = event => {
      const direction = event.target.value;
      this.setState({
        direction
      });
    };

    this.changeDuration = event => {
      const duration = parseInt(event.target.value, 10);
      if (isNaN(duration)) return;
      this.setState({
        duration
      });
    };
  }

  render() {
    const PlayOne = (0, _lib.withTransition)(_extends({}, this.state))(One);
    const PlayTwo = (0, _lib.withTransition)(_extends({}, this.state))(Two);
    const PlayThree = (0, _lib.withTransition)(_extends({}, this.state))(Three);
    return _react.default.createElement(_reactRouterDom.BrowserRouter, null, _react.default.createElement("div", {
      className: "App"
    }, _react.default.createElement("h1", null, "\u25B6\uFE0F Press Play"), _react.default.createElement("p", null, "A simple transition library for React (and routers!)"), "Effect:", _react.default.createElement("select", {
      value: this.state.effect,
      onChange: this.changeEffect
    }, this.effects.map(effect => _react.default.createElement("option", {
      value: effect,
      key: effect,
      checked: effect === this.state.effect
    }, effect))), ` | `, "Direction:", _react.default.createElement("select", {
      value: this.state.direction,
      onChange: this.changeDirection
    }, this.directions.map(direction => _react.default.createElement("option", {
      value: direction,
      key: direction,
      checked: direction === this.state.direction
    }, direction))), ` | `, "Duration:", _react.default.createElement("input", {
      type: "text",
      value: this.state.duration,
      onChange: this.changeDuration
    }), _react.default.createElement("hr", null), _react.default.createElement(NavBar, null), _react.default.createElement("hr", null), _react.default.createElement(_reactRouterDom.Route, {
      path: "/",
      exact: true,
      component: PlayOne
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: "/two",
      component: PlayTwo
    }), _react.default.createElement(_reactRouterDom.Route, {
      path: "/three",
      component: PlayThree
    }), _react.default.createElement("p", null, "Made By ", _react.default.createElement("a", {
      href: "https://jonquach.com"
    }, "Q"))));
  }

}

var _default = App;
exports.default = _default;