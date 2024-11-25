import { fetchCors, HttpMethod } from '@api/src/handlers/utils/fetch_with_cors';
import { unpackJsonResponseBody } from '@api/src/handlers/utils/unpack_body';
import { Cv } from '@api/src/responses/cv';

/**
 * Get CV given its id
 * @param apiOrigin The url where fetch goes
 * @param id Id of the CV to get
 * @returns The CV with given id
 */
export async function getCv(apiOrigin: URL, id: number): Promise<Cv> {
  const response = await fetchCors(new URL(apiOrigin.href + `cv/${id}`), {
    method: HttpMethod.Get,
  });
  return (await unpackJsonResponseBody(response)) as Cv;
}

/**
 * Options for creating a CV
 */
export interface createCvOptions {
  /** Position in Russian */
  positionRu: string;
  /** Position in English */
  positionEn: string;
  /** Working experience */
  workingExperience: string;
  /** Job search status */
  jobSearchStatus: string;
  /** CV description */
  description: string;
}

/**
 * Create cv
 * @param apiOrigin The url where fetch goes
 * @param positionRu Position in Russian
 * @param positionEn Position in English
 * @param workingExperience Working experience
 * @param jobSearchStatus Job search status
 * @param description CV description
 * @returns The created CV
 */
export async function createCv(
  apiOrigin: URL,
  { positionRu, positionEn, workingExperience, jobSearchStatus, description }: createCvOptions,
): Promise<Cv> {
  const data = new FormData();
  data.append('positionEn', positionEn);
  data.append('positionRu', positionRu);
  data.append('workingExperience', workingExperience);
  data.append('jobSearchStatus', jobSearchStatus);
  data.append('description', description);
  const response = await fetchCors(new URL(apiOrigin.href + 'cv'), {
    method: HttpMethod.Post,
    credentials: 'include',
    body: data,
  });
  return (await unpackJsonResponseBody(response)) as Cv;
}

/**
 * Delete CV given its id
 * @param apiOrigin - The URL where the fetch request is sent
 * @param id - The ID of the CV to delete
 * @returns A promise that resolves to the deleted CV
 */
export async function deleteCv(apiOrigin: URL, id: number): Promise<Cv> {
  const response = await fetchCors(new URL(apiOrigin.href + `cv/${id}`), {
    method: HttpMethod.Delete,
    credentials: 'include',
  });
  return (await unpackJsonResponseBody(response)) as Cv;
}

interface updateCvOptions extends createCvOptions {
  id: number;
}

/**
 * Update cv given its id
 * @param apiOrigin The url where fetch goes
 * @param id The id of the CV to update
 * @param positionRu Position in Russian
 * @param positionEn Position in English
 * @param workingExperience Working experience
 * @param jobSearchStatus Job search status
 * @param description CV description
 * @returns The updated CV
 */
export async function updateCv(
  apiOrigin: URL,
  { id, positionRu, positionEn, workingExperience, jobSearchStatus, description }: updateCvOptions,
): Promise<Cv> {
  const data = new FormData();
  data.append('positionEn', positionEn);
  data.append('positionRu', positionRu);
  data.append('workingExperience', workingExperience);
  data.append('jobSearchStatus', jobSearchStatus);
  data.append('description', description);
  const response = await fetchCors(new URL(apiOrigin.href + `cv/${id}`), {
    method: HttpMethod.Put,
    body: data,
    credentials: 'include',
  });
  return (await unpackJsonResponseBody(response)) as Cv;
}
