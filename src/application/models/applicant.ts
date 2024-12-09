import fallbackUserAvatar from '@static/img/user-icon-80.svg';
import { Applicant as ApiApplicant } from '@api/src/responses/applicant';

/** Data structure representing Applicant */
export interface Applicant {
  id: number;
  firstName: string;
  secondName: string;
  city: string;
  birthDate: Date;
  avatar: string;
  contacts: string;
  education: string;
}

/**
 * Converts an applicant response from the API to an instance of Applicant.
 * @param apiResponse - Applicant response from the API
 * @returns an instance of Applicant
 */
export function makeApplicantFromApi(apiResponse: ApiApplicant): Applicant {
  return {
    id: apiResponse.id,
    firstName: apiResponse.firstName,
    secondName: apiResponse.lastName,
    city: apiResponse.city,
    birthDate: new Date(apiResponse.birthDate),
    avatar: apiResponse.avatar || fallbackUserAvatar,
    contacts: apiResponse.contacts,
    education: apiResponse.education,
  };
}
