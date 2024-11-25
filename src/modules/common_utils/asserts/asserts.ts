/**
 * @fileoverview This file contains common functions asserting some expressions
 */

/** assertIfError asserts if passed value is an error
 * @param potentialError The value to be checked
 */
export function assertIfError(potentialError: unknown) {
  if (!(potentialError instanceof Error)) throw new Error('potentialError is not an Error');
}

/**
 * assertIfObject asserts if input is plain object.
 * @param potentialObject A value to be checked
 */
export function assertIfObject(potentialObject: unknown) {
  if (Object.prototype.toString.call(potentialObject) !== '[object Object]')
    throw new TypeError('potentialObject is not a plain object');
}
