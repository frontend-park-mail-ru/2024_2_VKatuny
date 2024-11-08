import { ComponentModel } from '../../../modules/Components/Component.js';
import { Api } from '../../../modules/Api/Api.js';
import { Minicard } from '../../Minicard/Minicard.js';
import { resolveUrl } from '../../../modules/UrlUtils/UrlUtils.js';
import { Vacancy } from '../../../modules/models/Vacancy.js';
import { VacancyPage } from '../../../Pages/VacancyPage/VacancyPage.js';

export class EmployerVacancyListModel extends ComponentModel {
  #userId;
  #isOwner;
  #items;
  constructor({ userId, isListOwner }) {
    super();
    this.#userId = userId;
    this.#isOwner = isListOwner;
    this.#items = [];
  }

  async getItems() {
    const vacanciesJson = await Api.getEmployerVacancies({ id: this.#userId });
    const vacanciesObjects = vacanciesJson.reduce((vacanciesObjects, vacancyJson) => {
      try {
        const vacancy = new Vacancy(vacancyJson);
        this.#items.push(vacancy);
        const urlSearchQuery = {};
        urlSearchQuery[`${VacancyPage.VACANCY_ID_PARAM}`] = vacancy.id;
        vacanciesObjects.push(
          new Minicard({
            renderParams: {
              elementClass: 'employer-vacancy-list__minicard',
              title: vacancy.position,
              isCardOwner: this.#isOwner,
              goToLink: resolveUrl('vacancy', urlSearchQuery),
              editButtonUrl: resolveUrl('editVacancy', urlSearchQuery),
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

  async removeChild(vacancyArrId) {
    if (vacancyArrId >= this.#items.length || vacancyArrId < 0) {
      return false;
    }
    const vacancy = this.#items[vacancyArrId];
    try {
      await Api.deleteVacancyById({ id: vacancy.id });
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
