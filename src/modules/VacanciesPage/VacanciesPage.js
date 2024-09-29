import { Page } from '/src/modules/Page/Page.js';
import { VacancyCard } from '/src/modules/components/VacancyCard.js';
import { AlertWindow } from '/src/modules/components/AlertWindow.js';
import { resolveUrl } from '../UrlUtils/UrlUtils.js';
import { addEventListeners } from '../EventUtils/EventUtils.js';
import { Api } from '../Api/Api.js';
import { throttle } from '/src/modules/Decorators/Decorators.js';

/** A class representing 404 not found page.
 * @extends Page
 */
export class VacanciesPage extends Page {
  #alertWindows;
  #vacancies;
  #vacancyContainer;
  #sideColumn;

  #VACANCY_PAGE_AMOUNT = 5;
  #FEED_LOAD_TIMEOUT = 1000;

  /**
   * Create an instance of VacanciesPage
   * @param {URL} url --- a URL object containing the link with which this page were navigated
   * @throws {TypeError} url is not an instance of URL
   */
  constructor({ url, state }) {
    super({ url: url });
    this._state = state;
  }

  postRenderInit() {
    this.#vacancyContainer = document.querySelector('.content-body__vacancy-container');
    this.#sideColumn = document.querySelector('.vacancies-page__side-column');
    this.#alertWindows = [];
    this.#vacancies = [];
    if (this._state.userSession.isLoggedIn) {
      this._addAlertWindow({
        text: 'Попробуйте добавить свою вакансию!',
        buttonUrl: '/',
        buttonText: 'Добавить вакансию',
      });
    } else {
      this._addAlertWindow({
        text: 'Еще не с нами? Зарегистрируйтесь!',
        buttonUrl: resolveUrl('register'),
        buttonText: 'Зарегистрироваться',
      });
      this._addAlertWindow({
        text: 'Уже с нами? Тогда входите!',
        buttonUrl: resolveUrl('login'),
        buttonText: 'Войти',
      });
    }

    this._eventListeners.push({
      event: 'scroll',
      object: window,
      listener: throttle(() => {
        if (
          this.#vacancies.length < 1 ||
          isInViewport(this.#vacancies[this.#vacancies.length - 1])
        ) {
          this._addVacancies();
        }
      }, this.#FEED_LOAD_TIMEOUT),
    });
    addEventListeners(this._eventListeners);
  }

  async _addVacancies() {
    const moreVacancies = await Api.vacanciesFeed({
      offset: this.#vacancies.length,
      num: this.#VACANCY_PAGE_AMOUNT,
    });
    console.log(moreVacancies);
  }

  _addAlertWindow({ text, buttonUrl, buttonText }) {
    const alertWindow = new AlertWindow({
      elementClass: 'ruler__alert-window',
      text: text,
      buttonUrl: buttonUrl,
      buttonText: buttonText,
    });
    alertWindow._html = this.#sideColumn.appendChild(alertWindow.render());
    this.#alertWindows.push(alertWindow);
  }

  /**
   * Render this page.
   * @returns {string} HTML representation of the page
   */
  render() {
    return Handlebars.templates['vacancies.hbs']({ userAuthenticated: true });
  }
}

const isInViewport = (element) => {
  var rect = element.getBoundingClientRect();
  var html = document.documentElement;
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || html.clientHeight) &&
    rect.right <= (window.innerWidth || html.clientWidth)
  );
};
