import { ComponentModel } from '../../modules/Components/Component.js';
import { Api } from '../../modules/Api/Api.js';
import { Vacancy } from '../../modules/models/Vacancy.js';

export class VacancyArticleModel extends ComponentModel {
  #vacancyData;
  #vacancyId;

  constructor({ vacancyId }) {
    super();
    this.#vacancyId = vacancyId;
    this.#vacancyData = Api.getVacancyById({ id: this.#vacancyId }).then(
      (data) => new Vacancy(data),
    );
  }

  async getVacancyData() {
    return this.#vacancyData;
  }

  async getEmployerId() {
    return this.#vacancyData.employerId;
  }
}
