import React from "react";
import { withMotion } from "@helpscout/motion";

const EFFECTS = {
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

  drop: props => ({
    componentDidMount: ({ node, animate }) => {
      prepareIn(node);
      return animate({
        ...props,
        translateY: ["-50%", 0],
        easing: "easeOutElastic(1, .5)"
      });
    },
    componentWillUnmount: ({ node }) => {
      prepareOut(node);
      return staticTransitionOut(props);
    }
  }),

  pop: props => ({
    componentDidMount: ({ node, animate }) => {
      prepareIn(node);
      return animate({
        ...props,
        translateY: ["50%", 0],
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
        translateY: ["50%", 0],
        easing: "easeOutElastic(1, .5)"
      });
    },
    componentWillUnmount: ({ node }) => {
      prepareOut(node);
      return staticTransitionOut(props);
    }
  }),

  fadeAndMove: props => ({
    componentDidMount: ({ node, animate }) => {
      prepareIn(node);
      return animate({
        ...props,
        translateX: ["100%", 0],
        opacity: [0, 1]
      });
    },
    componentWillUnmount: ({ node, animate }) => {
      prepareOut(node);

      return animate({
        ...props,
        translateX: [0, "-100%"],
        opacity: [1, 0]
      }).finished.then(bufferFinished);
    }
  }),

  moveIn: props => ({
    componentDidMount: ({ node, animate }) => {
      prepareIn(node);
      return animate({
        ...props,
        translateX: ["100%", 0]
      });
    },
    componentWillUnmount: ({ node, animate }) => {
      prepareOut(node);

      return animate({
        ...props,
        keyframes: [
          {
            translateX: [0, "-100%"]
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

  fadeThroughColor: props => ({
    componentDidMount: ({ node, animate }) => {
      const parentNode = document.createElement("div");
      parentNode.style.background = "red";
      node.parentElement.insertBefore(parentNode, node);
      parentNode.appendChild(node);
      prepareIn(parentNode);

      return animate({
        ...props,
        targets: parentNode,
        opacity: [0, 1]
      }).finished.then(() => {
        parentNode.parentElement.insertBefore(node, parentNode);
        parentNode.parentElement.removeChild(parentNode);
      });
    },
    componentWillUnmount: ({ node, animate }) => {
      prepareOut(node);

      return animate({
        ...props,
        opacity: [1, 0]
      }).finished.then(bufferFinished);
    }
  }),

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
  })
};

const defaultOptions = {
  componentDidMount: () => Promise.resolve(),
  componentDidUpdate: () => Promise.resolve(),
  componentWillUnmount: () => Promise.resolve(),
  effect: "fade",
  easing: "linear",
  duration: 500
};

const getEffectMethods = effect => props => {
  const effectMethods = EFFECTS[effect](props);

  return effectMethods || {};
};

const withTransition = (options = defaultOptions) => WrappedComponent => {
  const { duration, effect, easing } = { ...defaultOptions, ...options };

  class PlayTransition extends React.PureComponent {
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  const effectProps = {
    duration,
    easing
  };

  return withMotion(getEffectMethods(effect)(effectProps))(PlayTransition);
};

function getBoundingClientRect(node) {
  const _document = node.ownerDocument || document;
  const body = _document.body;
  // Cache body overflow
  const _overflow = body.style.overflow;
  // Temporarily lock body overflow
  body.style.overflow = "hidden";
  // Get the most accurate BCR
  const rect = node.getBoundingClientRect();
  // Unlock body overflow
  body.style.overflow = _overflow;

  return rect;
}

function prepareIn(node) {
  const _position = node.style.position;
  node.style.position = _position || "relative";
}

function prepareOut(node) {
  const rect = getBoundingClientRect(node);

  const { x, y, width, height } = rect;

  node.style.position = "fixed";
  node.style.top = `${y}px`;
  node.style.left = `${x}px`;
  node.style.height = `${height}px`;
  node.style.width = `${width}px`;
  node.style.zIndex = 0;
  node.style.pointerEvents = "none";
}

function staticTransitionOut(props) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve();
    }, props.duration);
  });
}

function bufferFinished() {
  return staticTransitionOut({ duration: 100 });
}

export default withTransition;
