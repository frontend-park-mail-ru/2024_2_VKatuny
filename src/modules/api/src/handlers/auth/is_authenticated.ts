import { HttpMethod, fetchCors } from '@api/src/handlers/utils/fetch_with_cors';
import { unpackJsonResponseBody } from '@api/src/handlers/utils/unpack_body';
import { ShortUser } from '../../models/ShortUser';

/** Check if user is logged in */
export async function isAuthenticated(url: URL): Promise<ShortUser> {
  const response = await fetchCors(url, {
    method: HttpMethod.Post,
    credentials: 'include',
  });
  return (await unpackJsonResponseBody(response)) as ShortUser;
}
