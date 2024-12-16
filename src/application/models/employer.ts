import fallbackUserAvatar from '@static/img/user-icon-80.svg';
import { Employer as ApiEmployer } from '@api/src/responses/employer';

export interface Employer {
  id: number;
  firstName: string;
  secondName: string;
  city: string;
  position: string;
  companyName: string;
  companyDescription: string;
  companyWebsite: string;
  contacts: string;
  avatar: string;
}

export function makeEmployerFromApi(apiResponse: ApiEmployer): Employer {
  return {
    id: apiResponse.id,
    firstName: apiResponse.firstName,
    secondName: apiResponse.lastName,
    city: apiResponse.city,
    position: apiResponse.position,
    companyName: apiResponse.companyName,
    companyDescription: apiResponse.companyDescription,
    companyWebsite: apiResponse.companyWebsite,
    contacts: apiResponse.contacts,
    avatar: apiResponse.avatar || fallbackUserAvatar,
  };
}
