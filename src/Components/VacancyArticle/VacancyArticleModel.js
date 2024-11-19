import { ComponentModel } from '@/modules/Components/Component';
import { Api } from '@/modules/Api/Api';
import { Vacancy } from '@/modules/models/Vacancy';
import { NotFoundError } from '@/modules/Router/Router';
import state from '@/modules/AppState/AppState';
import USER_TYPE from '@/modules/UserSession/UserType';
import { catchStandardResponseError } from '@/modules/Api/Errors';

export class VacancyArticleModel extends ComponentModel {
  #vacancyData;
  #vacancyId;
  #userType;

  constructor({ vacancyId }) {
    super();
    this.#vacancyId = vacancyId;
    this.#vacancyData = Api.getVacancyById({ id: this.#vacancyId }).then(
      (data) => new Vacancy(data),
      () => {
        throw new NotFoundError('vacancy not found');
      },
    );
    this.#userType = state.userSession.userType;
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
      catchStandardResponseError(err);
      return false;
    }
  }

  async vacancyApply() {
    if (!this.#vacancyId || this.#userType !== USER_TYPE.APPLICANT) {
      return false;
    }
    try {
      await Api.vacancyApply({ id: this.#vacancyId });
      return true;
    } catch (err) {
      catchStandardResponseError(err);
      return false;
    }
  }

  async vacancyResetApply() {
    if (!this.#vacancyId || this.#userType !== USER_TYPE.APPLICANT) {
      return false;
    }
    try {
      await Api.vacancyResetApply({ id: this.#vacancyId });
      return true;
    } catch (err) {
      catchStandardResponseError(err);
      return false;
    }
  }
}
