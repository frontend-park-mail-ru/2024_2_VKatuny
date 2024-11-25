import { HttpMethod, fetchCors } from '@api/src/handlers/utils/fetch_with_cors';
import { unpackJsonResponseBody } from '@api/src/handlers/utils/unpack_body';
import type { Applicant } from '@api/src/responses/applicant';
import type { Employer } from '@api/src/responses/employer';

/** Options for registering a new applicant */
export interface registerApplicantOptions {
  /** First name of the applicant */
  firstName: string;
  /** Last name of the applicant */
  secondName: string;
  /** Birth date of the applicant */
  birthDate: Date;
  /** Email of the applicant */
  email: string;
  /** Password of the applicant */
  password: string;
}

/**
 * Registers a new applicant.
 * @param apiOrigin - The URL to send the registration request to.
 * @param firstName - The first name of the applicant.
 * @param secondName - The second name of the applicant.
 * @param birthDate - The birth date of the applicant.
 * @param email - The email address of the applicant.
 * @param password - The password for the applicant's account.
 * @returns A promise that resolves to the registered Applicant.
 */
export async function registerApplicant(
  apiOrigin: URL,
  { firstName, secondName, birthDate, email, password }: registerApplicantOptions,
): Promise<Applicant> {
  const response = await fetchCors(new URL(apiOrigin.href + 'applicant/registration'), {
    method: HttpMethod.Post,
    credentials: 'include',
    body: JSON.stringify({
      firstName,
      lastName: secondName,
      birthDate,
      email,
      password,
    }),
  });
  return (await unpackJsonResponseBody(response)) as Applicant;
}

export interface registerEmployerOptions {
  /** First name of the employer */
  firstName: string;
  /** Last name of the employer */
  secondName: string;
  /** Position of the employer */
  position: string;
  /** Name of the company */
  companyName: string;
  /** Description of the company */
  companyDescription: string;
  /** Website of the company */
  companyWebsite: string;
  /** Email of the employer */
  email: string;
  /** Password for the employer's account */
  password: string;
}

/**
 * Registers a new employer.
 * @param apiOrigin - The URL to send the registration request to.
 * @param firstName - The first name of the employer.
 * @param secondName - The last name of the employer.
 * @param position - The position of the employer.
 * @param companyName - The name of the company.
 * @param companyDescription - The description of the company.
 * @param companyWebsite - The website of the company.
 * @param email - The email address of the employer.
 * @param password - The password for the employer's account.
 * @returns A promise that resolves to the registered Employer.
 */
export async function registerEmployer(
  apiOrigin: URL,
  {
    firstName,
    secondName,
    position,
    companyName,
    companyDescription,
    companyWebsite,
    email,
    password,
  }: registerEmployerOptions,
): Promise<Employer> {
  const response = await fetchCors(new URL(apiOrigin.href + 'employer/registration'), {
    method: HttpMethod.Post,
    credentials: 'include',
    body: JSON.stringify({
      firstName,
      lastName: secondName,
      position,
      companyName,
      companyDescription,
      companyWebsite,
      email,
      password,
    }),
  });
  return (await unpackJsonResponseBody(response)) as Employer;
}
