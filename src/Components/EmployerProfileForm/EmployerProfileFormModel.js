import { catchStandardResponseError } from '@/modules/app_errors/Errors';
import { ComponentModel } from '@/modules/Components/Component';
import { Employer } from '@/modules/models/Employer';
import { getEmployer, updateEmployerProfile } from '@/modules/api/api';
import appState from '@/modules/AppState/AppState';

export class EmployerProfileFormModel extends ComponentModel {
  #lastValidData;
  #userId;

  constructor({ userId }) {
    super();
    this.#userId = userId;
    this.#lastValidData = getEmployer(appState.backendUrl, userId).then(
      (Response) => new Employer(Response),
    );
  }

  get lastValidData() {
    return this.#lastValidData;
  }

  async submit(formData) {
    formData.id = this.#userId;
    try {
      await updateEmployerProfile(appState.backendUrl, formData);
      this.#lastValidData = new Employer(formData);
      return true;
    } catch (err) {
      catchStandardResponseError(err);
    }
    return false;
  }
}
