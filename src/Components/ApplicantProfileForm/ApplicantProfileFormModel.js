import { ComponentModel } from '../../modules/Components/Component.js';
import { Api } from '../../modules/Api/Api.js';

export class ApplicantProfileFormModel extends ComponentModel {
  #lastValidData;

  constructor({ userId }) {
    super();
    this.#lastValidData = Api.getApplicantById({ id: userId });
    console.log(this.#lastValidData);
  }

  get lastValidData() {
    return this.#lastValidData;
  }

  async submit() {
    Api.updateApplicantProfile();
  }

  reset() {}
}
