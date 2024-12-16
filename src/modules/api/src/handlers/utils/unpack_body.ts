import { UnmarshallError, ResponseError, CsrfError } from '@api/src/errors/errors';
import { HTTP_STATUSCODE } from '@/modules/api/src/types/http_status_code';

/** A common json response body of api handlers */
export interface BaseResponseBody {
  readonly statusCode: number; // backend operation status code
  readonly error: string; // error message
  readonly body: unknown; // generalized response body
}

export enum CsrfErrors {
  NoToken = 'csrf token is empty',
  TokenExpired = 'csrf token expired',
}

/** unpackJsonResponseBody unpacks api response json body and throwing error
 * if something is wrong
 * @param response The response to unpack
 * @return A promise which resolves to unpacked response
 */
export async function unpackJsonResponseBody(response: Response): Promise<unknown> {
  let responseBody: BaseResponseBody;
  try {
    responseBody = await response.json();
  } catch {
    throw new UnmarshallError('Could not unmarshall json');
  }
  if (!responseBody.statusCode) {
    throw new UnmarshallError('Expected statusCode in json, but not found');
  }
  if (responseBody.statusCode !== HTTP_STATUSCODE.OK) {
    if (!responseBody.error) {
      throw new UnmarshallError('Expected error in json, but not found');
    }
    if (
      responseBody.error === CsrfErrors.NoToken ||
      responseBody.error === CsrfErrors.TokenExpired
    ) {
      throw new CsrfError(responseBody.error);
    }
    throw new ResponseError(responseBody.error);
  }
  if (!responseBody.body && responseBody.body !== null) {
    throw new UnmarshallError('Expected body in json, but not found');
  }
  return responseBody.body;
}
