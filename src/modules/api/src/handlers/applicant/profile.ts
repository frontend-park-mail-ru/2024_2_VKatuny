import type { Applicant } from '@api/src/responses/applicant';
import { fetchCors, HttpMethod } from '@api/src/handlers/utils/fetch_with_cors';
import { unpackJsonResponseBody } from '@api/src/handlers/utils/unpack_body';

/**
 * Get applicant information using they id
 * @param apiOrigin - URL of the API
 * @param id - id of the applicant
 * @returns applicant information
 */
export async function getApplicant(apiOrigin: URL, id: number): Promise<Applicant> {
  const response = await fetchCors(new URL(apiOrigin.href + `applicant/${id}/profile`), {
    method: HttpMethod.Get,
  });

  return (await unpackJsonResponseBody(response)) as Applicant;
}

/**
 * Options for updating an applicant's profile.
 */
export interface updateApplicantProfileOptions {
  /** The unique identifier of the applicant */
  id: number;
  /** The first name of the applicant */
  firstName: string;
  /** The last name of the applicant */
  secondName: string;
  /** The city where the applicant resides */
  city: string;
  /** The educational background of the applicant */
  education: string;
  /** The birth date of the applicant */
  birthDate: Date;
  /** The contact information of the applicant */
  contacts: string;
}

/** Update applicant profile information
 * @param apiOrigin - URL of the API
 * @param id - id of the applicant
 * @param firstName - The first name of the applicant
 * @param secondName - The last name of the applicant
 * @param city - The city where the applicant resides
 * @param education - The educational background of the applicant
 * @param birthDate - The birth date of the applicant
 * @param contacts - The contact information of the applicant
 */
export async function updateApplicantProfile(
  apiOrigin: URL,
  {
    id,
    firstName,
    secondName,
    city,
    education,
    birthDate,
    contacts,
  }: updateApplicantProfileOptions,
): Promise<Applicant> {
  const data = new FormData();
  data.append('firstName', firstName);
  data.append('lastName', secondName);
  data.append('city', city);
  data.append('education', education);
  data.append('birthDate', birthDate.toISOString());
  data.append('contacts', contacts);
  const response = await fetchCors(new URL(apiOrigin.href + `applicant/${id}/profile`), {
    method: HttpMethod.Put,
    credentials: 'include',
    body: data,
  });
  return (await unpackJsonResponseBody(response)) as Applicant;
}
