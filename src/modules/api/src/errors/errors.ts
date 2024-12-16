/** A file containing api module errors */

/** TransportError happens when fetch fails to get to the server */
export class TransportError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, TransportError.prototype);
  }
}

/** UnmarshallError happens when json parsing failed or json body is not
 * correct
 */
export class UnmarshallError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, UnmarshallError.prototype);
  }
}

/** ResponseError happens when api returned error */
export class ResponseError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, ResponseError.prototype);
  }
}

/** CsrfError happens when api returned csrf error */
export class CsrfError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CsrfError.prototype);
  }
}
