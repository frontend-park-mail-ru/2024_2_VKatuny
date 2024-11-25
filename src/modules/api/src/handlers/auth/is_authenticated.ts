import { HttpMethod, fetchCors } from '@api/src/handlers/utils/fetch_with_cors';
import { unpackJsonResponseBody } from '@api/src/handlers/utils/unpack_body';
import { ShortUser } from '@api/src/responses/short_user';

/** Check if user is logged in
 * @param apiOrigin The URL to send the check request to.
 * @returns A promise that resolves to the logged-in user.
 */
export async function getUserAuthenticationStatus(apiOrigin: URL): Promise<ShortUser> {
  const response = await fetchCors(new URL(apiOrigin.href + 'authorized'), {
    method: HttpMethod.Get,
    credentials: 'include',
  });
  return (await unpackJsonResponseBody(response)) as ShortUser;
}
