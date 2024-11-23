import type { UserType } from '@api/src/models/UserType';
import type { ShortUser } from '@api/src/models/ShortUser';
import { HttpMethod, fetchCors } from '@api/src/handlers/utils/fetch_with_cors';
import { unpackJsonResponseBody } from '@api/src/handlers/utils/unpack_body';

export interface LoginOptions {
  userType: UserType;
  email: string;
  password: string;
}

/** Login a new session */
export async function login(
  url: URL,
  { userType, email, password }: LoginOptions,
): Promise<ShortUser> {
  const response = await fetchCors(url, {
    method: HttpMethod.Post,
    body: JSON.stringify({
      userType,
      email,
      password,
    }),
    credentials: 'include',
  });
  return (await unpackJsonResponseBody(response)) as ShortUser;
}
