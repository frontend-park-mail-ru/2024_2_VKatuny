import { ComponentModel } from '../../modules/Components/Component.js';
import { Api } from '../../modules/Api/Api.js';

export class ApplicantProfileFormModel extends ComponentModel {
  #lastValidData;

  constructor({ userId }) {
    super();
    this.#lastValidData = Api.getApplicantById({ id: userId });
  }

  get lastValidData() {
    return this.#lastValidData;
  }

  async submit(formData) {
    if (Api.updateApplicantProfile(formData)) {
      this.#lastValidData = formData;
      return true;
    }
    return false;
  }
}
