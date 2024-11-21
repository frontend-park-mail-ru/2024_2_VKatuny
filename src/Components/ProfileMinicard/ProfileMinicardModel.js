import { ComponentModel } from '@/modules/Components/Component';
import USER_TYPE from '@/modules/UserSession/UserType';
import { Api } from '@/modules/api/Api';
import { Applicant } from '@/modules/models/Applicant';
import { Employer } from '@/modules/models/Employer';

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
        ? new Applicant(await Api.getApplicantById({ id: this.#userId }))
        : new Employer(await Api.getEmployerById({ id: this.#userId }));
    user.fullName = `${user.firstName} ${user.secondName}`;
    user.city = user.city || 'Неизвестно';
    user.contacts = user.contacts || 'Не указаны';
    return user;
  }
}
