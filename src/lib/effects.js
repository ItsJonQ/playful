import {
  bufferFinished,
  prepareIn,
  prepareOut,
  remapPropsToTranslate,
  staticTransitionOut
} from "./utils";

/**
 * Retrieves the effect from the collection
 * @param {string} effect The name of the effect. (e.g. swipe)
 * @returns {Object} The effect with it's methods.
 */
export const getEffectMethods = effect => props => {
  const effectMethods = effects[effect](props);

  return effectMethods || {};
};

/**
 * A collection of all the transition effects for this library.
 */
export const effects = {
  fade: props => ({
    componentDidMount: ({ node, animate }) => {
      prepareIn(node);
      return animate({
        ...props,
        opacity: [0, 1]
      });
    },
    componentWillUnmount: ({ node, animate }) => {
      prepareOut(node);
      return animate({
        ...props,
        delay: props.duration / 2,
        opacity: [1, 0]
      }).finished.then(bufferFinished);
    }
  }),

  pop: props => ({
    componentDidMount: ({ node, animate }) => {
      prepareIn(node);
      return animate({
        ...props,
        ...remapPropsToTranslate(props, ["50%", 0]),
        easing: "easeOutElastic(1, .5)"
      });
    },
    componentWillUnmount: ({ node }) => {
      prepareOut(node);
      return staticTransitionOut(props);
    }
  }),

  fadeAndPop: props => ({
    componentDidMount: ({ node, animate }) => {
      prepareIn(node);
      return animate({
        ...props,
        opacity: {
          value: [0, 1],
          easing: "linear"
        },
        ...remapPropsToTranslate(props, ["50%", 0]),
        easing: "easeOutElastic(1, .5)"
      });
    },
    componentWillUnmount: ({ node }) => {
      prepareOut(node);
      return staticTransitionOut(props);
    }
  }),

  fadeAndSlide: props => ({
    componentDidMount: ({ node, animate }) => {
      prepareIn(node);
      return animate({
        ...props,
        ...remapPropsToTranslate(props, ["100%", 0]),
        opacity: [0, 1]
      });
    },
    componentWillUnmount: ({ node, animate }) => {
      prepareOut(node);

      return animate({
        ...props,
        ...remapPropsToTranslate(props, [0, "-100%"]),
        opacity: [1, 0]
      }).finished.then(bufferFinished);
    }
  }),

  slide: props => ({
    componentDidMount: ({ node, animate }) => {
      prepareIn(node);
      return animate({
        ...props,
        ...remapPropsToTranslate(props, ["100%", 0])
      });
    },
    componentWillUnmount: ({ node, animate }) => {
      prepareOut(node);

      return animate({
        ...props,
        keyframes: [
          {
            ...remapPropsToTranslate(props, [0, "-100%"])
          },
          {
            opacity: [1, 0],
            easing: "linear"
          }
        ],
        duration: props.duration * 2
      }).finished.then(bufferFinished);
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
    componentDidMount: ({ node, animate }) => {
      prepareIn(node);
      return animate({
        ...props,
        scale: [0.8, 1],
        opacity: [0, 1]
      });
    },
    componentWillUnmount: ({ node, animate }) => {
      prepareOut(node);
      return staticTransitionOut(props);
    }
  }),

  zoom: props => ({
    componentDidMount: ({ node, animate }) => {
      prepareIn(node);
      return animate({
        ...props,
        scale: [0.8, 1],
        opacity: [0, 1]
      });
    },

    componentWillUnmount: ({ node, animate }) => {
      prepareOut(node);
      return animate({
        ...props,
        scale: [1, 1.2],
        opacity: [1, 0]
      }).finished.then(bufferFinished);
    }
  }),

  swipe: props => ({
    componentDidMount: ({ node, animate }) => {
      prepareIn(node);
      return animate({
        ...props,
        ...remapPropsToTranslate(props, ["100%", 0])
      });
    },
    componentWillUnmount: ({ node, animate }) => {
      prepareOut(node);

      return animate({
        ...props,
        keyframes: [
          {
            ...remapPropsToTranslate(props, [0, "-25%"])
          },
          {
            opacity: [1, 0],
            easing: "linear"
          }
        ],
        duration: props.duration * 2
      }).finished.then(bufferFinished);
    }
  })
};
