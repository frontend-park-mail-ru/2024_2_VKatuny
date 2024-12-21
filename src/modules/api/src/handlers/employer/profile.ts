import type { Employer } from '@api/src/responses/employer';
import { fetchCors, HttpMethod } from '@api/src/handlers/utils/fetch_with_cors';
import { unpackJsonResponseBody } from '@api/src/handlers/utils/unpack_body';

/**
 * Get employer information using they id
 * @param apiOrigin - The URL to get the employer from.
 * @param id - The ID of the employer to get.
 * @returns A promise that resolves to the employer with the given ID.
 */
export async function getEmployer(apiOrigin: URL, id: number): Promise<Employer> {
  const response = await fetchCors(new URL(apiOrigin.href + `employer/${id}/profile`), {
    method: HttpMethod.Get,
  });
  return (await unpackJsonResponseBody(response)) as Employer;
}

export interface updateEmployerProfileOptions {
  /** ID of the employer */
  id: number;
  /** First name of the employer */
  firstName: string;
  /** Last name of the employer */
  secondName: string;
  /** City where the employer resides */
  city: string;
  /** Contact information of the employer */
  contacts: string;
  avatar?: File;
}

/**
 * Update employer profile information.
 * @param apiOrigin - The URL of the API endpoint.
 * @param id - The ID of the employer.
 * @param firstName - The first name of the employer.
 * @param secondName - The last name of the employer.
 * @param city - The city where the employer resides.
 * @param contacts - The contact information of the employer.
 * @returns A promise that resolves to the updated Employer.
 */
export async function updateEmployerProfile(
  apiOrigin: URL,
  token: string,
  { id, firstName, secondName, city, contacts, avatar }: updateEmployerProfileOptions,
): Promise<Employer> {
  const data = new FormData();
  data.append('firstName', firstName);
  data.append('lastName', secondName);
  data.append('city', city);
  data.append('contacts', contacts);
  data.append('id', id.toString());
  if (avatar) {
    data.append('avatar', avatar);
  }
  const response = await fetchCors(
    new URL(apiOrigin.href + `employer/${id}/profile`),
    {
      credentials: 'include',
      method: HttpMethod.Put,
      body: data,
    },
    token,
  );
  return (await unpackJsonResponseBody(response)) as Employer;
}
