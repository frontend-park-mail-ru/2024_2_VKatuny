import { Cv as ApiCv } from '@/modules/api/src/responses/cv';
import fallbackUserIcon from '@static/img/user-icon-80.svg';

/** Interface representing curriculum vitae */
export interface Cv {
  id: number;
  applicantId: number;
  positionRu: string;
  positionEn: string;
  description: string;
  jobSearchStatus: string;
  workingExperience: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
}

export function makeCvFromApi(apiResponse: ApiCv) {
  return {
    id: apiResponse.id,
    applicantId: apiResponse.applicant,
    positionRu: apiResponse.positionRu,
    positionEn: apiResponse.positionEn,
    description: apiResponse.description,
    jobSearchStatus: apiResponse.jobSearchStatus,
    workingExperience: apiResponse.workingExperience,
    avatar: apiResponse.avatar || fallbackUserIcon,
    createdAt: new Date(apiResponse.createdAt),
    updatedAt: new Date(apiResponse.updatedAt),
  };
}
