import { Api } from '../../modules/Api/Api.js';
import { ComponentModel } from '../../modules/Components/Component.js';
import { Cv } from '../../modules/models/Cv.js';
import { resolveUrl } from '../../modules/UrlUtils/UrlUtils.js';
import { zip } from '../../modules/ObjectUtils/Zip.js';
import eventBus from '../../modules/Events/EventBus.js';
import { REDIRECT_TO } from '../../modules/Events/Events.js';

export class CvFormModel extends ComponentModel {
  #lastValidData;
  #cvId;
  #isNew;

  constructor({ cvId = null }) {
    super();
    this.#cvId = cvId;
    this.#isNew = !this.#cvId;
    this.#lastValidData = this.#cvId
      ? Api.getCvById({ id: this.#cvId }).then(
          (cv) => new Cv(cv),
          () => {
            eventBus.emit(REDIRECT_TO, { redirectUrl: resolveUrl('createCv') });
          },
        )
      : null;
  }

  async getLastValidData() {
    return this.#lastValidData;
  }

  async submit(formData) {
    const cv = this.#isNew
      ? await Api.createCv(formData)
      : await Api.updateCvById(zip({ id: this.#cvId }, formData));
    if (cv) {
      this.#lastValidData = formData;
      return cv;
    }
    return null;
  }

  validate(formData) {
    const hasEmptyRequiredFields = [formData.positionRu, formData.jobSearchStatus].some(
      (fieldValue) => {
        return !fieldValue.trim();
      },
    );
    if (hasEmptyRequiredFields) {
      return 'Заполните обязательные поля';
    }
  }
}
