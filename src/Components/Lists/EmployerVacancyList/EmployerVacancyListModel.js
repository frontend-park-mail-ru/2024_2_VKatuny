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

  getItems() {
    const vacanciesJson = Api.getEmployerVacancies({ id: this.#userId });
    const vacanciesObjects = vacanciesJson.reduce((vacanciesObjects, vacancyJson) => {
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
    }, []);
    return vacanciesObjects;
  }
}
