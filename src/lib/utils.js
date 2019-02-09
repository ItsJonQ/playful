/**
 * Checks to see if a value is literally zero (0).
 * @param {any} value The value to check against (e.g. 0, or '0px')
 * @returns {boolean} The result.
 */
export const isZero = value => {
  return parseInt(value, 10) === 0;
};

/**
 * Adjusts the translateX/Y values to flow correctly given the direction.
 * @param {string} direction The direction (up, down, left, right).
 * @param {number/string} value The value to adjust (e.g. 10px, 0 25%).
 * @returns {number/string} The converted value.
 */
export const swapValues = (direction, value) => {
  if (isZero(value)) return value;
  const intValue = parseInt(value, 10);

  if (direction === "right" || direction === "down") return value;

  const flippedValue = intValue * -1;

  if (typeof value === "string") {
    return value.replace(intValue, flippedValue);
  }

  return flippedValue;
};

/**
 * Creates a translateX/translateY object with key/value, given a direction,
 * from and to value.
 * @param {Object} options Options
 * @param {string} options.direction The direction. (e.g. top, bottom, left, right)
 * @param {string/number} options.from The value to start the transition.
 * @param {string/number} options.to The value to ebd the transition.
 * @returns {Object} The remapped translateX/translateY key/value.
 */
export const createTranslateProp = (
  options = { direction: "right", from: "100%", to: 0 }
) => {
  const { direction, from, to } = options;
  const isX = direction === "right" || direction === "left";
  const translateProp = isX ? "translateX" : "translateY";

  return {
    [translateProp]: [swapValues(direction, from), swapValues(direction, to)]
  };
};

/**
 * Remaps props from withTransition to the appropriate translateX/translateY
 * key/value, given the direction and from/to values.
 * @param {*} props The withTransition props.
 * @param {*} values The from/to translate values. (e.g. ['-100%', 0])
 * @returns {Object} The remapped translateX/translateY key/value.
 */
export const remapPropsToTranslate = (props, values) => {
  const { direction } = props;
  const [from, to] = values;
  return createTranslateProp({ direction, from, to, props: {} });
};

/**
 * A more accurate version of getBoundingClientRect. This temporarily "locks"
 * the window.document.body to get the most accurate x, y, width, height
 * readings from a DOM node.
 * @param {HTMLElement} node The DOM node to get the values from.
 * @returns {Object} The getBoundingClientRect props.
 */
export const getBoundingClientRect = node => {
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
};

/**
 * Adjusts the DOM node to prepare the "in" transition animation.
 * @param {HTMLElement} node
 */
export const prepareIn = node => {
  const _position = node.style.position;
  node.style.position = _position || "relative";
};

/**
 * Adjusts the DOM node to prepare the "out" transition animation.
 * @param {HTMLElement} node
 */
export const prepareOut = node => {
  const rect = getBoundingClientRect(node);

  const { x, y, width, height } = rect;

  node.style.position = "fixed";
  node.style.top = `${y}px`;
  node.style.left = `${x}px`;
  node.style.height = `${height}px`;
  node.style.width = `${width}px`;
  node.style.zIndex = 0;
  node.style.pointerEvents = "none";
};

/**
 * Used for static animations during the "out" transition phase.
 * @param {any} props The props from the transition.
 * @returns {Promise} A promise that auto resolves from the prop.duration.
 */
export const staticTransitionOut = props => {
  return new Promise(resolve => {
    setTimeout(() => {
      return resolve();
    }, props.duration);
  });
};

/**
 * Adds a little bit of buffer time before removing the DOM Node at
 * the end of the animation.
 * @returns {Promise} A promise that auto resolves after 100ms.
 */
export const bufferFinished = () => {
  return staticTransitionOut({ duration: 100 });
};
