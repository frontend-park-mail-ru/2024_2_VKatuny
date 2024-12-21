import type { Vacancy } from '@api/src/responses/vacancy';
import { fetchCors, HttpMethod } from '@api/src/handlers/utils/fetch_with_cors';
import { makeQueryParams } from '@api/src/handlers/utils/make_query_params';
import { unpackJsonResponseBody } from '../utils/unpack_body';

export interface vacanciesFeedOptions {
  offset: number;
  num: number;
  searchQuery?: string;
  searchBy?: string;
  group?: string;
}

/** Get vacancies with given params
 * @param apiOrigin Backend handler location
 * @param offset Query result offset
 * @param num Amount of given vacancies
 * @param searchBy The field used to search. If undefined, search will be without priority
 * @param searchQuery The query used to search. If undefined, the search gives all vacancies
 * @param group Vacancies subcategory that will be returned.
 * @returns An array of vacancies which satisfy the query
 */
export async function getVacanciesFeed(
  apiOrigin: URL,
  { offset, num, searchBy, searchQuery, group }: vacanciesFeedOptions,
): Promise<Array<Vacancy>> {
  const response = await fetchCors(
    new URL(
      apiOrigin.href +
        `vacancies?` +
        makeQueryParams({ offset, num, searchBy, searchQuery, group }),
    ),
    {
      method: HttpMethod.Get,
    },
  );
  return (await unpackJsonResponseBody(response)) as Array<Vacancy>;
}
