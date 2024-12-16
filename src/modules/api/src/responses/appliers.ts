import { Applicant } from './applicant';
/** Appliers list response */
export interface AppliersListResponse {
  subscribers: Array<Applicant>;
  vacancyId: number;
}
