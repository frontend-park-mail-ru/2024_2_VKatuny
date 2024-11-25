import { fetchCors, HttpMethod } from '@api/src/handlers/utils/fetch_with_cors';
import type { Vacancy } from '@api/src/responses/vacancy';
import { unpackJsonResponseBody } from '@api/src/handlers/utils/unpack_body';

/**
 * Get vacancies of an employer given they id
 * @param apiOrigin The URL where fetch goes
 * @param id The id of the employer
 * @returns A promise that resolves to an array of employer's vacancies
 */
export async function getEmployerVacancies(apiOrigin: URL, id: number): Promise<Array<Vacancy>> {
  const response = await fetchCors(new URL(apiOrigin.href + `employer/${id}/vacancies`), {
    method: HttpMethod.Get,
  });
  return (await unpackJsonResponseBody(response)) as Array<Vacancy>;
}
