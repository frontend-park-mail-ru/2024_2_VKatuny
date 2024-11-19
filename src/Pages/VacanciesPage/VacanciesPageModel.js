import { PageModel } from '../../modules/Page/Page.js';
import state from '/src/modules/AppState/AppState.js';
import USER_TYPE from '/src/modules/UserSession/UserType.js';
import { resolveUrl } from '@/modules/UrlUtils/UrlUtils';
import { AlertWindow } from '../../Components/AlertWindow/AlertWindow.js';
import { VacancyCard } from '/src/Components/VacancyCard/VacancyCard.js';
import { Vacancy } from '../../modules/models/Vacancy.js';
import { Api } from '../../modules/Api/Api.js';
import { catchStandardResponseError } from '../../modules/Api/Errors.js';

export class VacanciesPageModel extends PageModel {
  #vacanciesLoaded;
  #VACANCIES_AMOUNT = 5;
  #searchQuery;
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
          text: 'Еще не с нами? Зарегистрируйтесь!',
          buttonUrl: resolveUrl('register'),
          buttonText: 'Зарегистрироваться',
        },
      }),
      new AlertWindow({
        viewParams: {
          elementClass: 'ruler__alert-window',
          text: 'Уже с нами? Тогда входите!',
          buttonUrl: resolveUrl('login'),
          buttonText: 'Войти',
        },
      }),
    ];
  }

  needToFetch(newSearchInput) {
    return this.#searchQuery !== newSearchInput;
  }

  async getVacancies() {
    try {
      let vacanciesJson = await Api.vacanciesFeed({
        offset: this.#vacanciesLoaded,
        num: this.#VACANCIES_AMOUNT,
        searchQuery: this.#searchQuery,
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

  submitSearch(searchInput) {
    this.#vacanciesLoaded = 0;
    this.#searchQuery = searchInput;
  }

  getVacancyHeader() {
    return this.#searchQuery
      ? `Вакансии по запросу: «${this.#searchQuery}»`
      : `Вакансии на сегодня`;
  }
}
