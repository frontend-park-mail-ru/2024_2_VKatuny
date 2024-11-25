import { Cv } from '@api/src/responses/cv';
import { fetchCors, HttpMethod } from '@api/src/handlers/utils/fetch_with_cors';
import { unpackJsonResponseBody } from '@api/src/handlers/utils/unpack_body';

/**
 * Get applicant cvs with they id
 * @param apiOrigin - URL of the API
 * @param id - id of the applicant
 * @returns A promise that resolves to the array of applicant's CVs
 */
export async function getApplicantCvs(apiOrigin: URL, id: number): Promise<Array<Cv>> {
  const response = await fetchCors(new URL(apiOrigin.href + `applicant/${id}/cv`), {
    method: HttpMethod.Get,
  });
  return (await unpackJsonResponseBody(response)) as Array<Cv>;
}
