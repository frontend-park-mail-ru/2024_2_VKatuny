import { Api } from '../../modules/Api/Api.js';
import { ComponentModel } from '../../modules/Components/Component.js';

export class EmployerProfileFormModel extends ComponentModel {
  #lastValidData;

  constructor({ userId }) {
    super();
    this.#lastValidData = Api.getApplicantById({ id: userId });
  }

  get lastValidData() {
    return this.#lastValidData;
  }

  async submit(formData) {
    if (Api.updateEmployerProfile(formData)) {
      this.#lastValidData = formData;
      return true;
    }
    return false;
  }
}
