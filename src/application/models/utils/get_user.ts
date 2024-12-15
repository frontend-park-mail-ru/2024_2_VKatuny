import type { Applicant as ApiApplicant } from '@api/src/responses/applicant';
import { getEmployer, getApplicant } from '@api/api';
import type { Employer as ApiEmployer } from '@api/src/responses/employer';
import { makeApplicantFromApi } from '../applicant';
import { makeEmployerFromApi } from '../employer';
import { UserType } from '../user-type';

export async function getUser(backendOrigin: URL, userType: UserType, id: number) {
  return userType === UserType.Applicant
    ? makeApplicantFromApi((await getApplicant(backendOrigin, id)) as ApiApplicant)
    : makeEmployerFromApi((await getEmployer(backendOrigin, id)) as ApiEmployer);
}
