import { fetchCors, HttpMethod } from '@api/src/handlers/utils/fetch_with_cors';
import { unpackJsonResponseBody } from '@api/src/handlers/utils/unpack_body';
import type { Portfolio } from '@api/src/responses/portfolio';

/**
 * Get applicant portfolios using their id.
 * @param apiOrigin - The URL of the API.
 * @param id - The id of the applicant.
 * @returns A promise that resolves to an array of applicant's portfolios.
 */
export async function getApplicantPortfolios(
  apiOrigin: URL,
  id: number,
): Promise<Array<Portfolio>> {
  const response = await fetchCors(new URL(apiOrigin.href + `applicant/${id}/portfolio`), {
    method: HttpMethod.Get,
  });
  return (await unpackJsonResponseBody(response)) as Array<Portfolio>;
}
