import { ComponentModel } from '@/modules/Components/Component';
import { getCv, deleteCv } from '@/modules/api/api';
import { NotFoundError } from '@/modules/Router/Router';
import { Cv } from '@/modules/models/Cv';
import { catchStandardResponseError } from '@/modules/app_errors/Errors';
import appState from '@/modules/AppState/AppState';

export class CvArticleModel extends ComponentModel {
  #cvData;
  #cvId;

  constructor({ cvId }) {
    super();
    this.#cvId = cvId;
    this.#cvData = getCv(appState.backendUrl, this.#cvId).then(
      (data) => new Cv(data),
      () => {
        throw new NotFoundError('cv not found');
      },
    );
  }

  async getCvData() {
    return this.#cvData;
  }

  async getApplicantId() {
    const vacancyData = await this.#cvData;
    return vacancyData.applicantId;
  }

  async cvDelete() {
    if (!this.#cvId) {
      return false;
    }
    try {
      await deleteCv(appState.backendUrl, this.#cvId);
      return true;
    } catch (err) {
      catchStandardResponseError(err);
      return false;
    }
  }
}
