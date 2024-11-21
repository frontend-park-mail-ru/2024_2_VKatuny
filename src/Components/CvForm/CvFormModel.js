import { Api } from '@/modules/api/Api';
import { ComponentModel } from '@/modules/Components/Component';
import { Cv } from '@/modules/models/Cv';
import { resolveUrl } from '@/modules/UrlUtils/UrlUtils';
import { zip } from '@common_utils/object_utils/zip';
import eventBus from '@/modules/Events/EventBus';
import { REDIRECT_TO } from '@/modules/Events/Events';
import { catchStandardResponseError } from '@/modules/api/Errors';

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
    try {
      const cv = this.#isNew
        ? await Api.createCv(formData)
        : await Api.updateCvById(zip({ id: this.#cvId }, formData));
      if (cv) {
        this.#lastValidData = formData;
        return cv;
      }
    } catch (err) {
      catchStandardResponseError(err);
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
