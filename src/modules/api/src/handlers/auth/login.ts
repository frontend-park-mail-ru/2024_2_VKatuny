import type { UserType } from '@api/src/responses/user_type';
import type { ShortUser } from '@api/src/responses/short_user';
import { HttpMethod, fetchCors } from '@api/src/handlers/utils/fetch_with_cors';
import { unpackJsonResponseBody } from '@api/src/handlers/utils/unpack_body';

export interface LoginOptions {
  /** The type of user. */
  userType: UserType;
  /** The user's email. */
  email: string;
  /** The user's password. */
  password: string;
}

/**
 * Logs in a new session.
 * @param apiOrigin The URL to send the login request to.
 * @param options The login options.
 * @returns A promise that resolves to the logged-in user.
 */
export async function login(
  apiOrigin: URL,
  { userType, email, password }: LoginOptions,
): Promise<ShortUser> {
  const response = await fetchCors(new URL(apiOrigin.href + 'login'), {
    method: HttpMethod.Post,
    body: JSON.stringify({ userType, email, password }),
    credentials: 'include',
  });
  return (await unpackJsonResponseBody(response)) as ShortUser;
}

/**
 * Logs out the current session.
 * @param apiOrigin The URL to send the logout request to.
 * @returns A promise that resolves to the logged-out user.
 */
export async function logout(apiOrigin: URL): Promise<ShortUser> {
  const response = await fetchCors(new URL(apiOrigin.href + 'logout'), {
    method: HttpMethod.Post,
    credentials: 'include',
  });
  return (await unpackJsonResponseBody(response)) as ShortUser;
}
