import { ComponentModel } from '../../modules/Components/Component.js';
import { Api } from '../../modules/Api/Api.js';
import { Applicant } from '../../modules/models/Applicant.js';
import { catchStandardResponseError } from '../../modules/Api/Errors.js';

export class ApplicantProfileFormModel extends ComponentModel {
  #lastValidData;
  #userId;

  constructor({ userId }) {
    super();
    this.#userId = userId;
    this.#lastValidData = Api.getApplicantById({ id: userId }).then((response) => {
      const app = new Applicant(response);
      app.birthDate = app.birthDate.toISOString().split('T')[0];
      return app;
    });
  }

  get lastValidData() {
    return this.#lastValidData;
  }

  async submit(formData) {
    formData.birthDate = new Date(formData.birthDate);
    formData.id = this.#userId;
    try {
      await Api.updateApplicantProfile(formData);
      const app = new Applicant(formData);
      app.birthDate = app.birthDate.toISOString().split('T')[0];
      this.#lastValidData = app;
      return true;
    } catch (err) {
      catchStandardResponseError(err);
    }
    return false;
  }
}
