import { assertIfError } from '@common_utils/asserts/asserts';
import { TransportError } from '@api/src/errors/errors';

/** Enumeration representing possible api http methods */
export enum HttpMethod {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Delete = 'DELETE',
}

/** Parameters used when fetching http api */
export interface FetchOptions {
  method: HttpMethod;
  credentials?: RequestCredentials;
  body?: BodyInit;
}

/** Binds fetch with non-changing request parameters
 * @param url The url where fetch goes
 * @param method Http method
 * @param credentials Fetch credentials policy
 * @param body Request body
 */
export async function fetchCorsJson(
  url: URL,
  { method = HttpMethod.Get, credentials, body }: FetchOptions,
): Promise<Response> {
  try {
    return fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      mode: 'cors',
      credentials,
      body,
    });
  } catch (error: any) {
    assertIfError(error);
    throw new TransportError(error.message);
  }
}
