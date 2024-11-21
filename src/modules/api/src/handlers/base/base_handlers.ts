/** A common json response body of api handlers */
export interface BaseResponseBody {
  readonly statusCode: number; // backend operation status code
  readonly error: string; // error message
  readonly body: unknown; // generalized response body
}
