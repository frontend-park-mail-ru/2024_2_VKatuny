import { Api } from '../../modules/Api/Api.js';
import { ComponentModel } from '../../modules/Components/Component.js';
import { Vacancy } from '../../modules/models/Vacancy.js';
import { resolveUrl } from '../../modules/UrlUtils/UrlUtils.js';
import { zip } from '../../modules/ObjectUtils/Zip.js';
import eventBus from '../../modules/Events/EventBus.js';
import { REDIRECT_TO } from '../../modules/Events/Events.js';

export class VacancyFormModel extends ComponentModel {
  #lastValidData;
  #vacancyId;
  #isNew;

  constructor({ vacancyId = null }) {
    super();
    this.#vacancyId = vacancyId;
    this.#isNew = !this.#vacancyId;
    this.#lastValidData = this.#vacancyId
      ? Api.getVacancyById({ id: this.#vacancyId }).then(
          (vacancy) => new Vacancy(vacancy),
          () => {
            eventBus.emit(REDIRECT_TO, { redirectUrl: resolveUrl('createVacancy') });
          },
        )
      : null;
  }

  async getLastValidData() {
    return this.#lastValidData;
  }

  async submit(formData) {
    const vacancy = this.#isNew
      ? await Api.createVacancy(formData)
      : await Api.updateVacancyById(zip({ id: this.#vacancyId }, formData));
    if (vacancy) {
      this.#lastValidData = formData;
      return vacancy;
    }
    return null;
  }

  validate(formData) {
    const hasEmptyFields = Object.entries(formData).some(([fieldKey, fieldValue]) => {
      if (fieldKey === 'salary') {
        return false;
      }
      return !fieldValue.trim();
    });
    if (hasEmptyFields) {
      return 'Заполните пустые поля';
    }
  }
}
