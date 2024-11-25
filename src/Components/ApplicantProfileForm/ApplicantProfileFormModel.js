import { ComponentModel } from '@/modules/Components/Component';
import {
  getApplicant as apiGetApplicant,
  updateApplicantProfile as apiUpdateApplicantProfile,
} from '@api/api';
import { Applicant } from '@/modules/models/Applicant';
import { catchStandardResponseError } from '@/modules/app_errors/Errors';
import appState from '@/modules/AppState/AppState';

export class ApplicantProfileFormModel extends ComponentModel {
  #lastValidData;
  #userId;

  constructor({ userId }) {
    super();
    this.#userId = userId;
    this.#lastValidData = apiGetApplicant(appState.backendUrl, userId).then((response) => {
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
      await apiUpdateApplicantProfile(appState.backendUrl, formData);
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
