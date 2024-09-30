/**
 * Add event listeners from array of listeners
 * @param {*} listeners
 */
export const addEventListeners = (listeners) => {
  if (!listeners) {
    return;
  }
  listeners.forEach(({ event, object, listener }) => {
    object.addEventListener(event, listener);
  });
};

/**
 * Remove event listeners from array of listeners
 * @param {*} listeners
 */
export const removeEventListeners = (listeners) => {
  if (!listeners) {
    return;
  }
  listeners.forEach(({ event, object, listener }) => {
    object.removeEventListener(event, listener);
  });
};
