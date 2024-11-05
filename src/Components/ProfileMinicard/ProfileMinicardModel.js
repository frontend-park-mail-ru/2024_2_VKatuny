import { ComponentModel } from '../../modules/Components/Component.js';
import USER_TYPE from '../../modules/UserSession/UserType.js';
import { Api } from '../../modules/Api/Api.js';
import { Applicant } from '../../modules/models/Applicant.js';
import { Employer } from '../../modules/models/Employer.js';

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
