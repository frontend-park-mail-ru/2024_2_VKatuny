/** A file containing api module errors */

/** TransportError happens when fetch fails to get to the server */
export class TransportError extends Error {}

/** UnmarshallError happens when json parsing failed or json body is not
 * correct
 */
export class UnmarshallError extends Error {}

/** ResponseError happens when api returned error */
export class ResponseError extends Error {}
