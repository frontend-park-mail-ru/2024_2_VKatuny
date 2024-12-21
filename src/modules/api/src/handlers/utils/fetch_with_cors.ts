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
 * @param csrfToken CSRF token
 * @param body Request body
 * @returns A promise that resolves to the basic api response
 */
export async function fetchCors(
  url: URL,
  { method = HttpMethod.Get, credentials, body }: FetchOptions,
  csrfToken?: string,
): Promise<Response> {
  try {
    return await fetch(url, {
      method,
      headers: {
        Accept: 'application/json',
        'X-CSRF-Token': csrfToken ?? '',
      },
      mode: 'cors',
      credentials,
      body,
    });
  } catch (error: unknown) {
    assertIfError(error);
    if (error instanceof Error) throw new TransportError(error.message);
  }
}
