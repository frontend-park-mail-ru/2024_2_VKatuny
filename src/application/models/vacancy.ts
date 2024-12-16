import { Vacancy as ApiVacancy } from '@/modules/api/src/responses/vacancy';
import fallbackVacancyIcon from '@static/img/company-icon.svg';

/** Interface representing vacancy */
export interface Vacancy {
  id: number;
  employerId: number;
  companyName: string;
  salary: number;
  position: string;
  location: string;
  description: string;
  workType: string;
  avatar: string;
  positionGroup: string;
  createdAt: Date;
  updatedAt: Date;
}

export function makeVacancyFromApi(apiResponse: ApiVacancy) {
  return {
    id: apiResponse.id,
    employerId: apiResponse.employer,
    companyName: apiResponse.companyName,
    salary: apiResponse.salary,
    position: apiResponse.position,
    location: apiResponse.location,
    description: apiResponse.description,
    workType: apiResponse.workType,
    avatar: apiResponse.avatar || fallbackVacancyIcon,
    positionGroup: apiResponse.positionGroup,
    createdAt: new Date(apiResponse.createdAt),
    updatedAt: new Date(apiResponse.updatedAt),
  };
}
