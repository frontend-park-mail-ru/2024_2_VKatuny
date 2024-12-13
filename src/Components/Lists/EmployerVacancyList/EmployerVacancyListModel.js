import { ComponentModel } from '@/modules/Components/Component';
import { Minicard } from '@/Components/Minicard/Minicard';
import { resolveUrl } from '@/modules/common_utils/url_utils/url_utils';
import { Vacancy } from '@/modules/models/Vacancy';
import { VacancyPage } from '@/Pages/VacancyPage/VacancyPage';
import { getEmployerVacancies, deleteVacancy } from '@api/api';
import appState from '@/modules/AppState/AppState';

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
    const vacanciesJson = await getEmployerVacancies(appState.backendUrl, this.#userId);
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
      await deleteVacancy(appState.backendUrl, vacancy.id);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
