"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.effects = exports.getEffectMethods = void 0;

var _utils = require("./utils");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/**
 * Retrieves the effect from the collection
 * @param {string} effect The name of the effect. (e.g. swipe)
 * @returns {Object} The effect with it's methods.
 */
const getEffectMethods = effect => props => {
  const effectMethods = effects[effect](props);
  return effectMethods || {};
};
/**
 * A collection of all the transition effects for this library.
 */


exports.getEffectMethods = getEffectMethods;
const effects = {
  fade: props => ({
    componentDidMount: ({
      node,
      animate
    }) => {
      (0, _utils.prepareIn)(node);
      return animate(_extends({}, props, {
        opacity: [0, 1]
      }));
    },
    componentWillUnmount: ({
      node,
      animate
    }) => {
      (0, _utils.prepareOut)(node);
      return animate(_extends({}, props, {
        delay: props.duration / 2,
        opacity: [1, 0]
      })).finished.then(_utils.bufferFinished);
    }
  }),
  pop: props => ({
    componentDidMount: ({
      node,
      animate
    }) => {
      (0, _utils.prepareIn)(node);
      return animate(_extends({}, props, (0, _utils.remapPropsToTranslate)(props, ["50%", 0]), {
        easing: "easeOutElastic(1, .5)"
      }));
    },
    componentWillUnmount: ({
      node
    }) => {
      (0, _utils.prepareOut)(node);
      return (0, _utils.staticTransitionOut)(props);
    }
  }),
  fadeAndPop: props => ({
    componentDidMount: ({
      node,
      animate
    }) => {
      (0, _utils.prepareIn)(node);
      return animate(_extends({}, props, {
        opacity: {
          value: [0, 1],
          easing: "linear"
        }
      }, (0, _utils.remapPropsToTranslate)(props, ["50%", 0]), {
        easing: "easeOutElastic(1, .5)"
      }));
    },
    componentWillUnmount: ({
      node
    }) => {
      (0, _utils.prepareOut)(node);
      return (0, _utils.staticTransitionOut)(props);
    }
  }),
  fadeAndSlide: props => ({
    componentDidMount: ({
      node,
      animate
    }) => {
      (0, _utils.prepareIn)(node);
      return animate(_extends({}, props, (0, _utils.remapPropsToTranslate)(props, ["100%", 0]), {
        opacity: [0, 1]
      }));
    },
    componentWillUnmount: ({
      node,
      animate
    }) => {
      (0, _utils.prepareOut)(node);
      return animate(_extends({}, props, (0, _utils.remapPropsToTranslate)(props, [0, "-100%"]), {
        opacity: [1, 0]
      })).finished.then(_utils.bufferFinished);
    }
  }),
  slide: props => ({
    componentDidMount: ({
      node,
      animate
    }) => {
      (0, _utils.prepareIn)(node);
      return animate(_extends({}, props, (0, _utils.remapPropsToTranslate)(props, ["100%", 0])));
    },
    componentWillUnmount: ({
      node,
      animate
    }) => {
      (0, _utils.prepareOut)(node);
      return animate(_extends({}, props, {
        keyframes: [_extends({}, (0, _utils.remapPropsToTranslate)(props, [0, "-100%"])), {
          opacity: [1, 0],
          easing: "linear"
        }],
        duration: props.duration * 2
      })).finished.then(_utils.bufferFinished);
    }
  }),
  // fadeThroughColor: props => ({
  //   componentDidMount: ({ node, animate }) => {
  //     const parentNode = document.createElement("div");
  //     parentNode.style.background = props.color || 'white';
  //     node.parentElement.insertBefore(parentNode, node);
  //     parentNode.appendChild(node);
  //     prepareIn(parentNode);
  //     return animate({
  //       ...props,
  //       targets: parentNode,
  //       opacity: [0, 1]
  //     }).finished.then(() => {
  //       parentNode.parentElement.insertBefore(node, parentNode);
  //       parentNode.parentElement.removeChild(parentNode);
  //     });
  //   },
  //   componentWillUnmount: ({ node, animate }) => {
  //     prepareOut(node);
  //     return animate({
  //       ...props,
  //       opacity: [1, 0]
  //     }).finished.then(bufferFinished);
  //   }
  // }),
  scale: props => ({
    componentDidMount: ({
      node,
      animate
    }) => {
      (0, _utils.prepareIn)(node);
      return animate(_extends({}, props, {
        scale: [0.8, 1],
        opacity: [0, 1]
      }));
    },
    componentWillUnmount: ({
      node,
      animate
    }) => {
      (0, _utils.prepareOut)(node);
      return (0, _utils.staticTransitionOut)(props);
    }
  }),
  zoom: props => ({
    componentDidMount: ({
      node,
      animate
    }) => {
      (0, _utils.prepareIn)(node);
      return animate(_extends({}, props, {
        scale: [0.8, 1],
        opacity: [0, 1]
      }));
    },
    componentWillUnmount: ({
      node,
      animate
    }) => {
      (0, _utils.prepareOut)(node);
      return animate(_extends({}, props, {
        scale: [1, 1.2],
        opacity: [1, 0]
      })).finished.then(_utils.bufferFinished);
    }
  }),
  swipe: props => ({
    componentDidMount: ({
      node,
      animate
    }) => {
      (0, _utils.prepareIn)(node);
      return animate(_extends({}, props, (0, _utils.remapPropsToTranslate)(props, ["100%", 0])));
    },
    componentWillUnmount: ({
      node,
      animate
    }) => {
      (0, _utils.prepareOut)(node);
      return animate(_extends({}, props, {
        keyframes: [_extends({}, (0, _utils.remapPropsToTranslate)(props, [0, "-25%"])), {
          opacity: [1, 0],
          easing: "linear"
        }],
        duration: props.duration * 2
      })).finished.then(_utils.bufferFinished);
    }
  })
};
exports.effects = effects;