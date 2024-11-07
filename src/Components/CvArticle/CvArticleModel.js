import { ComponentModel } from '../../modules/Components/Component.js';
import { Api } from '../../modules/Api/Api.js';
import { NotFoundError } from '../../modules/Router/Router.js';
import { Cv } from '../../modules/models/Cv.js';

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
      console.log(err);
      return false;
    }
  }
}
