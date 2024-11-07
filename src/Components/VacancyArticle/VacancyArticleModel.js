import { ComponentModel } from '../../modules/Components/Component.js';
import { Api } from '../../modules/Api/Api.js';
import { Vacancy } from '../../modules/models/Vacancy.js';
import { NotFoundError } from '../../modules/Router/Router.js';

export class VacancyArticleModel extends ComponentModel {
  #vacancyData;
  #vacancyId;

  constructor({ vacancyId }) {
    super();
    this.#vacancyId = vacancyId;
    this.#vacancyData = Api.getVacancyById({ id: this.#vacancyId }).then(
      (data) => new Vacancy(data),
      () => {
        throw new NotFoundError('vacancy not found');
      },
    );
  }

  async getVacancyData() {
    return this.#vacancyData;
  }

  async getEmployerId() {
    const vacancyData = await this.#vacancyData;
    return vacancyData.employerId;
  }

  async vacancyDelete() {
    if (!this.#vacancyId) {
      return false;
    }
    try {
      await Api.deleteVacancyById({ id: this.#vacancyId });
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
