import { fetchCors, HttpMethod } from '@api/src/handlers/utils/fetch_with_cors';
import { unpackJsonResponseBody } from '@api/src/handlers/utils/unpack_body';
import { Vacancy } from '@api/src/responses/vacancy';

/**
 * Get vacancy given its id
 * @param apiOrigin The URL where fetch goes
 * @param id The id of the vacancy to get
 * @returns A promise that resolves to the vacancy with the given id
 */
export async function getVacancy(apiOrigin: URL, id: number): Promise<Vacancy> {
  const response = await fetchCors(new URL(apiOrigin.href + `vacancy/${id}`), {
    method: HttpMethod.Get,
  });
  return (await unpackJsonResponseBody(response)) as Vacancy;
}

export interface createVacancyOptions {
  /** The position of the vacancy */
  position: string;
  /** The salary offered for the vacancy */
  salary: number;
  /** The location of the vacancy */
  location: string;
  /** A description of the vacancy */
  description: string;
  /** The work type of the vacancy */
  workType: string;
  /** A subcategory of the vacancy */
  positionGroup: string;
}

/** Create vacancy
 * @param apiOrigin The URL where fetch goes
 * @param position The position of the vacancy
 * @param salary The salary offered for the vacancy
 * @param location The location of the vacancy
 * @param description A description of the vacancy
 * @param workType The work type of the vacancy
 * @returns A promise that resolves to the created vacancy
 */
export async function createVacancy(
  apiOrigin: URL,
  { position, salary, location, description, workType, positionGroup }: createVacancyOptions,
): Promise<Vacancy> {
  const data = new FormData();
  data.append('salary', salary.toString());
  data.append('position', position);
  data.append('location', location);
  data.append('description', description);
  data.append('workType', workType);
  data.append('group', positionGroup);
  const response = await fetchCors(new URL(apiOrigin + `vacancy`), {
    method: HttpMethod.Post,
    body: data,
    credentials: 'include',
  });
  return (await unpackJsonResponseBody(response)) as Vacancy;
}

/** Delete vacancy given its id
 * @param apiOrigin The URL where fetch goes
 * @param id The id of the vacancy to delete
 * @returns A promise that resolves to the deleted vacancy
 */
export async function deleteVacancy(apiOrigin: URL, id: number): Promise<Vacancy> {
  const response = await fetchCors(new URL(apiOrigin.href + `vacancy/${id}`), {
    method: HttpMethod.Delete,
    credentials: 'include',
  });
  return (await unpackJsonResponseBody(response)) as Vacancy;
}

interface updateVacancyOptions extends createVacancyOptions {
  /** The id of the vacancy */
  id: number;
}

/**
 * Update vacancy given its id
 * @param apiOrigin The URL where the fetch request is sent
 * @param id The id of the vacancy to update
 * @param salary The salary of the vacancy
 * @param position The position of the vacancy
 * @param location The location of the vacancy
 * @param description A description of the vacancy
 * @param workType The work type of the vacancy
 * @returns A promise that resolves to the updated vacancy
 */
export async function updateVacancy(
  apiOrigin: URL,
  { id, salary, position, location, description, workType, positionGroup }: updateVacancyOptions,
): Promise<Vacancy> {
  const data = new FormData();
  data.append('salary', salary.toString());
  data.append('position', position);
  data.append('location', location);
  data.append('description', description);
  data.append('workType', workType);
  data.append('group', positionGroup);
  const response = await fetchCors(new URL(apiOrigin.href + `vacancy/${id}`), {
    method: HttpMethod.Put,
    body: data,
    credentials: 'include',
  });
  return (await unpackJsonResponseBody(response)) as Vacancy;
}
