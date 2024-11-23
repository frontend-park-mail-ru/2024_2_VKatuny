import { HttpMethod, fetchCors } from '@api/src/handlers/utils/fetch_with_cors';
import { unpackJsonResponseBody } from '@api/src/handlers/utils/unpack_body';
import type { Applicant } from '@api/src/models/Applicant';
import type { Employer } from '@api/src/models/Employer';

export interface registerApplicantOptions {
  firstName: string;
  secondName: string;
  birthDate: Date;
  email: string;
  password: string;
}

/** Sign up new applicant */
export async function registerApplicant(
  url: URL,
  { firstName, secondName, birthDate, email, password }: registerApplicantOptions,
): Promise<Applicant> {
  const response = await fetchCors(url, {
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
  firstName: string;
  secondName: string;
  position: string;
  companyName: string;
  companyDescription: string;
  companyWebsite: string;
  email: string;
  password: string;
}

export async function registerEmployer(
  url: URL,
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
  const response = await fetchCors(url, {
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
