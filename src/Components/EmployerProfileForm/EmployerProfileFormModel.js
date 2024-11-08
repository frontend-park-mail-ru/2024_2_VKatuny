import { Api } from '../../modules/Api/Api.js';
import { ComponentModel } from '../../modules/Components/Component.js';
import { Employer } from '../../modules/models/Employer.js';

export class EmployerProfileFormModel extends ComponentModel {
  #lastValidData;
  #userId;

  constructor({ userId }) {
    super();
    this.#userId = userId;
    this.#lastValidData = Api.getEmployerById({ id: userId }).then(
      (Response) => new Employer(Response),
    );
  }

  get lastValidData() {
    return this.#lastValidData;
  }

  async submit(formData) {
    formData.birthDate = new Date(formData.birthDate);
    formData.id = this.#userId;
    if (await Api.updateEmployerProfile(formData)) {
      return true;
    }
    return false;
  }
}
