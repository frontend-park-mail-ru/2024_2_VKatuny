import { ComponentModel } from '../../modules/Components/Component.js';
import USER_TYPE from '../../modules/UserSession/UserType.js';
import { Api } from '../../modules/Api/Api.js';

export class ProfileMinicardModel extends ComponentModel {
  #userId;
  #userType;
  constructor({ userId, userType }) {
    super();
    this.#userId = userId;
    this.#userType = userType;
  }

  async getData() {
    const data =
      this.#userType === USER_TYPE.APPLICANT
        ? await Api.getApplicantById({ id: this.#userId })
        : await Api.getEmployerById({ id: this.#userId });
    data.fullName = `${data.firstName} ${data.secondName}`;
    return data;
  }
}
