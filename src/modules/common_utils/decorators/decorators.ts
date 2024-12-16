/**
 * Decorator that throttles function execution to given `ms` milliseconds interval.
 * @param func - function to throttle
 * @param ms - throttling interval
 * @returns  throttled function
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function throttle(func: Function, ms: number): Function {
  let isThrottled = false,
    savedArgs: unknown,
    savedThis: unknown;

  function wrapper(...args: unknown[]) {
    if (isThrottled) {
      savedArgs = args;
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      savedThis = this;
      return;
    }
    func.apply(this, ...args);

    isThrottled = true;

    setTimeout(function () {
      isThrottled = false;
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }
  return wrapper;
}
