import { PageModel } from '../../modules/Page/Page.js';
import state from '/src/modules/AppState/AppState.js';
import USER_TYPES from '/src/modules/UserSession/UserTypes.js';
import { resolveUrl } from '../../modules/UrlUtils/UrlUtils.js';
import { AlertWindow } from '../../Components/AlertWindow/AlertWindow.js';
import { VacancyCard } from '/src/Components/VacancyCard/VacancyCard.js';
import { Api } from '../../modules/Api/Api.js';

export class VacanciesPageModel extends PageModel {
  #vacanciesLoaded;
  #VACANCIES_AMOUNT = 5;
  constructor() {
    super();
    this.loggedIn = state.userSession.isLoggedIn;
    this.#vacanciesLoaded = 0;
  }

  getAlertWindows() {
    if (state.userSession.isLoggedIn) {
      switch (state.userSession.userType) {
        case USER_TYPES.EMPLOYER: {
          return [
            new AlertWindow({
              renderParams: {
                elementClass: 'ruler__alert-window',
                text: 'Попробуйте добавить свою вакансию!',
                buttonUrl: '/',
                buttonText: 'Добавить вакансию',
              },
            }),
          ];
        }
        case USER_TYPES.APPLICANT: {
          return [];
        }
      }
    }
    return [
      new AlertWindow({
        renderParams: {
          elementClass: 'ruler__alert-window',
          text: 'Еще не с нами? Зарегистрируйтесь!',
          buttonUrl: resolveUrl('register'),
          buttonText: 'Зарегистрироваться',
        },
      }),
      new AlertWindow({
        renderParams: {
          elementClass: 'ruler__alert-window',
          text: 'Уже с нами? Тогда входите!',
          buttonUrl: resolveUrl('login'),
          buttonText: 'Войти',
        },
      }),
    ];
  }

  async getVacancies() {
    let vacanciesJson = await Api.vacanciesFeed({
      offset: this.#vacanciesLoaded,
      num: this.#VACANCIES_AMOUNT,
    });
    const vacanciesObjects = vacanciesJson.reduce((vacanciesObjects, vacancyJson) => {
      try {
        const { createdAt, description, employer, location, logo, position, salary } = vacancyJson;
        vacanciesObjects.push(
          new VacancyCard({
            employer: { logo, city: location, name: employer },
            vacancy: { createdAt, description, position, salary },
          }),
        );
        this.#vacanciesLoaded++;
        return vacanciesObjects;
      } catch {
        return vacanciesObjects;
      }
    }, []);
    return vacanciesObjects;
  }
}
