/**
 * Add event listeners from array of listeners
 * @param {*} listeners 
 */
export const addEventListeners = (listeners) => {
  listeners.forEach(({event, object, listener}) => {
    object.addEventListener(event, listener);
  });
};


/**
 * Remove event listeners from array of listeners
 * @param {*} listeners 
 */
export const removeEventListeners = (listeners) => {
    listeners.forEach(({event, object, listener}) => {
        object.removeEventListener(event, listener);
    })
}
