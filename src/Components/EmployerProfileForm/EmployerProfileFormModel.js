import { Api } from '../../modules/Api/Api.js';
import { catchStandardResponseError } from '../../modules/Api/Errors.js';
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
    formData.id = this.#userId;
    try {
      const response = await Api.updateEmployerProfile(formData);
      this.#lastValidData = new Employer(response);
      return true;
    } catch (err) {
      catchStandardResponseError(err);
    }
    return false;
  }
}
