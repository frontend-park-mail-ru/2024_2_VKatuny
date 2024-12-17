import { fetchCors, HttpMethod } from '@api/src/handlers/utils/fetch_with_cors';
import { unpackJsonResponseBody } from '@api/src/handlers/utils/unpack_body';
import type { Application } from '@api/src/responses/application';
import { AppliersListResponse } from '../../responses/appliers';

/**
 * Get all applicants who applied to a vacancy given its id.
 * @param apiOrigin - The URL to send the request to.
 * @param id - The id of the vacancy.
 * @returns A promise that resolves to an array of applicants who applied to that vacancy.
 */
export async function getVacancyAppliers(
  apiOrigin: URL,
  token: string,
  id: number,
): Promise<AppliersListResponse> {
  const response = await fetchCors(
    new URL(apiOrigin.href + `vacancy/${id}/subscribers`),
    {
      method: HttpMethod.Get,
      credentials: 'include',
    },
    token,
  );
  return (await unpackJsonResponseBody(response)) as AppliersListResponse;
}

/**
 * Get the status of the application to the vacancy given its id.
 * @param apiOrigin - The URL to send the request to.
 * @param id - The id of the vacancy.
 * @returns A promise that resolves to the status of the application to that vacancy.
 */
export async function getVacancyApplyStatus(
  apiOrigin: URL,
  token: string,
  id: number,
): Promise<Application> {
  const response = await fetchCors(
    new URL(apiOrigin.href + `vacancy/${id}/subscription`),
    {
      method: HttpMethod.Get,
      credentials: 'include',
    },
    token,
  );
  return (await unpackJsonResponseBody(response)) as Application;
}

/**
 * Apply to the vacancy given its id.
 * @param apiOrigin - The URL to send the request to.
 * @param id - The id of the vacancy.
 * @returns A promise that resolves to the application to that vacancy.
 */
export async function applyToVacancy(
  apiOrigin: URL,
  token: string,
  id: number,
): Promise<Application> {
  const response = await fetchCors(
    new URL(apiOrigin.href + `vacancy/${id}/subscription`),
    {
      method: HttpMethod.Post,
      credentials: 'include',
    },
    token,
  );
  return (await unpackJsonResponseBody(response)) as Application;
}

/**
 * Reset application to the vacancy given its id.
 * @param apiOrigin - The URL to send the request to.
 * @param id - The id of the vacancy.
 * @returns A promise that resolves to null;
 */
export async function resetApplyToVacancy(
  apiOrigin: URL,
  token: string,
  id: number,
): Promise<Application> {
  const response = await fetchCors(
    new URL(apiOrigin.href + `vacancy/${id}/subscription`),
    {
      method: HttpMethod.Delete,
      credentials: 'include',
    },
    token,
  );
  return (await unpackJsonResponseBody(response)) as null;
}
