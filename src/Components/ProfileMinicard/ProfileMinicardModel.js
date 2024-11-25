import { ComponentModel } from '@/modules/Components/Component';
import USER_TYPE from '@/modules/UserSession/UserType';
import { Applicant } from '@/modules/models/Applicant';
import { Employer } from '@/modules/models/Employer';
import { getApplicant, getEmployer } from '@/modules/api/api';
import appState from '@/modules/AppState/AppState';

export class ProfileMinicardModel extends ComponentModel {
  #userId;
  #userType;
  constructor({ userId, userType }) {
    super();
    this.#userId = userId;
    this.#userType = userType;
  }

  async getData() {
    const user =
      this.#userType === USER_TYPE.APPLICANT
        ? new Applicant(await getApplicant(appState.backendUrl, this.#userId))
        : new Employer(await getEmployer(appState.backendUrl, this.#userId));
    user.fullName = `${user.firstName} ${user.secondName}`;
    user.city = user.city || 'Неизвестно';
    user.contacts = user.contacts || 'Не указаны';
    return user;
  }
}
