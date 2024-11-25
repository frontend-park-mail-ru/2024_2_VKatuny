import { PageModel } from '@/modules/Page/Page';
import state from '@/modules/AppState/AppState';
import USER_TYPE from '@/modules/UserSession/UserType';
import { resolveUrl } from '@/modules/UrlUtils/UrlUtils';
import { AlertWindow } from '@/Components/AlertWindow/AlertWindow';
import { VacancyCard } from '@/Components/VacancyCard/VacancyCard';
import { Vacancy } from '@/modules/models/Vacancy';
import { catchStandardResponseError } from '@/modules/app_errors/Errors';
import { getVacanciesFeed } from '@/modules/api/api';

export class VacanciesPageModel extends PageModel {
  #vacanciesLoaded;
  #VACANCIES_AMOUNT = 5;
  #searchQuery;
  #searchBy;
  #searchGroup;
  constructor() {
    super();
    this.loggedIn = state.userSession.isLoggedIn;
    this.#vacanciesLoaded = 0;
    this.#searchQuery = '';
  }

  getAlertWindows() {
    if (state.userSession.isLoggedIn) {
      switch (state.userSession.userType) {
        case USER_TYPE.EMPLOYER: {
          return [
            new AlertWindow({
              viewParams: {
                elementClass: 'ruler__alert-window',
                text: 'Попробуйте добавить свою вакансию!',
                buttonUrl: resolveUrl('createVacancy'),
                buttonText: 'Добавить вакансию',
              },
            }),
          ];
        }
        case USER_TYPE.APPLICANT: {
          return [];
        }
      }
    }
    return [
      new AlertWindow({
        viewParams: {
          elementClass: 'ruler__alert-window',
          text: 'Привет! Добро пожаловать на μArt, сайт для поиска работы в творческой сфере. Можете здесь осмотреться, но для полного доступа к сервису нужно зарегистрироваться.',
          buttonUrl: resolveUrl('register'),
          buttonText: 'Регистрация',
        },
      }),
    ];
  }

  needToFetch(newQuery) {
    return this.#searchQuery !== newQuery.searchQuery ||
           this.#searchBy !== newQuery.searchBy ||
           this.#searchGroup !== newQuery.searchGroup;
  }

  async getVacancies() {
    try {
      let vacanciesJson = await getVacanciesFeed(state.backendUrl, {
        offset: this.#vacanciesLoaded,
        num: this.#VACANCIES_AMOUNT,
        searchQuery: this.#searchQuery,
        searchBy: this.#searchBy,
        group: this.#searchGroup,
      });
      const vacanciesCards = vacanciesJson.reduce((vacanciesCards, vacancyJson) => {
        try {
          const vacancy = new Vacancy(vacancyJson);
          vacanciesCards.push(new VacancyCard({ vacancyObj: vacancy }));
          this.#vacanciesLoaded++;
          return vacanciesCards;
        } catch {
          return vacanciesCards;
        }
      }, []);
      return vacanciesCards;
    } catch (err) {
      catchStandardResponseError(err);
      return [];
    }
  }

  submitSearch(query) {
    this.#vacanciesLoaded = 0;
    this.#searchQuery = query.searchQuery;
    this.#searchBy = query.searchBy;
    this.#searchGroup = query.searchGroup;
  }

  getVacancyHeader() {
    if (!this.#searchQuery) {
      if (this.#searchGroup) {
        return `Вакансии в категории «${this.#searchGroup}»`;
      }
      return `Вакансии на сегодня`;
    }
    if (this.#searchGroup) {
      return `Вакансии по запросу «${this.#searchQuery}» в категории «${this.#searchGroup}»`;
    }
    return `Вакансии по запросу «${this.#searchQuery}»`;
  }
}
