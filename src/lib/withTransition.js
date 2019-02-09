import React from "react";
import { withMotion } from "@helpscout/motion";
import { getEffectMethods } from "./effects";

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
  const { componentDidUpdate, direction, duration, effect, easing } = {
    ...defaultOptions,
    ...options
  };

  class PlayTransition extends React.PureComponent {
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  const effectProps = {
    direction,
    duration,
    easing
  };

  const EnhancedComponent = withMotion({
    ...getEffectMethods(effect)(effectProps),
    componentDidUpdate
  })(PlayTransition);

  return EnhancedComponent;
};

export default withTransition;
