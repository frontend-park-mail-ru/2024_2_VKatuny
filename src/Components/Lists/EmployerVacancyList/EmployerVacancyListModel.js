import { ComponentModel } from '../../../modules/Components/Component.js';
import { Api } from '../../../modules/Api/Api.js';
import { Minicard } from '../../Minicard/Minicard.js';
import { resolveUrl } from '../../../modules/UrlUtils/UrlUtils.js';

export class EmployerVacancyListModel extends ComponentModel {
  #userId;
  #isOwner;
  constructor({ userId, isListOwner }) {
    super();
    this.#userId = userId;
    this.#isOwner = isListOwner;
  }

  async getItems() {
    const vacanciesJson = await Api.getEmployerVacancies({ id: this.#userId });
    const vacanciesObjects = vacanciesJson.reduce((vacanciesObjects, vacancyJson) => {
      try {
        const { id, position } = vacancyJson;
        vacanciesObjects.push(
          new Minicard({
            renderParams: {
              elementClass: 'employer-vacancy-list__minicard',
              title: position,
              isCardOwner: this.#isOwner,
              editButtonUrl: resolveUrl(`/vacancy/edit/${id}`),
            },
          }),
        );
        return vacanciesObjects;
      } catch {
        return vacanciesObjects;
      }
    }, []);
    return vacanciesObjects;
  }
}
