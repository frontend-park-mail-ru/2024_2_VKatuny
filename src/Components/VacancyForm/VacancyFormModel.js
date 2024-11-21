import { Api } from '@/modules/api/Api';
import { ComponentModel } from '@/modules/Components/Component';
import { Vacancy } from '@/modules/models/Vacancy';
import { resolveUrl } from '@/modules/UrlUtils/UrlUtils';
import { zip } from '@common_utils/object_utils/zip';
import eventBus from '@/modules/Events/EventBus';
import { REDIRECT_TO } from '@/modules/Events/Events';

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
