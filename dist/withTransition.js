"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _motion = require("@helpscout/motion");

var _effects = require("./effects");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const defaultOptions = {
  componentDidMount: () => Promise.resolve(),
  componentDidUpdate: () => Promise.resolve(),
  componentWillUnmount: () => Promise.resolve(),
  direction: "right",
  effect: "fade",
  easing: "linear",
  duration: 500
};
/**
 * The Higher-Order component that binds the WrappedComponent with
 * animations, specified by the provided options.
 * @param {Object} options Props to customize the animations.
 * @returns {React.Component} The enhanced React component.
 */

const withTransition = (options = defaultOptions) => WrappedComponent => {
  const {
    componentDidUpdate,
    direction,
    duration,
    effect,
    easing
  } = _extends({}, defaultOptions, options);

  class PlayTransition extends _react.default.PureComponent {
    render() {
      return _react.default.createElement(WrappedComponent, this.props);
    }

  }

  const EnhancedComponent = (0, _motion.withMotion)(_extends({}, (0, _effects.getEffectMethods)(effect)({
    direction,
    duration,
    easing
  }), {
    componentDidUpdate
  }))(PlayTransition);
  return EnhancedComponent;
};

var _default = withTransition;
exports.default = _default;