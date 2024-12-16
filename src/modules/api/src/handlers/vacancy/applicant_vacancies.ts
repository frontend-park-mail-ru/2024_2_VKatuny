import { Vacancy } from '../../responses/vacancy';
import { HttpMethod } from '../utils/fetch_with_cors';
import { fetchCors } from '../utils/fetch_with_cors';
import { unpackJsonResponseBody } from '../utils/unpack_body';

export async function getApplicantFavoriteVacancies(
  apiOrigin: URL,
  id: number,
): Promise<Array<Vacancy>> {
  const response = await fetchCors(new URL(apiOrigin.href + `applicant/${id}/favorite-vacancy`), {
    method: HttpMethod.Get,
  });
  return (await unpackJsonResponseBody(response)) as Array<Vacancy>;
}

export async function addVacancyToFavorites(
  apiOrigin: URL,
  token: string,
  id: number,
): Promise<void> {
  const response = await fetchCors(
    new URL(apiOrigin.href + `applicant/${id}/favorite-vacancy`),
    {
      method: HttpMethod.Post,
      credentials: 'include',
    },
    token,
  );
  return (await unpackJsonResponseBody(response)) as Promise<void>;
}

export async function removeVacancyFromFavorites(
  apiOrigin: URL,
  token: string,
  id: number,
): Promise<void> {
  const response = await fetchCors(
    new URL(apiOrigin.href + `applicant/${id}/favorite-vacancy`),
    {
      method: HttpMethod.Delete,
      credentials: 'include',
    },
    token,
  );
  return (await unpackJsonResponseBody(response)) as Promise<void>;
}
