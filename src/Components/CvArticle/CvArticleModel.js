import { ComponentModel } from '@/modules/Components/Component';
import { Api } from '@/modules/Api/Api';
import { NotFoundError } from '@/modules/Router/Router';
import { Cv } from '@/modules/models/Cv';
import { catchStandardResponseError } from '@/modules/Api/Errors';

export class CvArticleModel extends ComponentModel {
  #cvData;
  #cvId;

  constructor({ cvId }) {
    super();
    this.#cvId = cvId;
    this.#cvData = Api.getCvById({ id: this.#cvId }).then(
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
      await Api.deleteCvById({ id: this.#cvId });
      return true;
    } catch (err) {
      catchStandardResponseError(err);
      return false;
    }
  }
}
