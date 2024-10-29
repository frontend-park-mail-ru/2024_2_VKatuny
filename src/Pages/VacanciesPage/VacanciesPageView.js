import { FETCH_VACANCIES } from '../../modules/Events/Events.js';
import { addEventListeners } from '../../modules/Events/EventUtils.js';
import { PageView } from '../../modules/Page/Page.js';
import { throttle } from '/src/modules/Decorators/Decorators.js';
import eventBus from '/src/modules/Events/EventBus.js';

export class VacanciesPageView extends PageView {
  #sideColumn;
  #vacancyContainer;
  #alertWindows;
  #vacancies;

  #FEED_LOAD_TIMEOUT = 500;
  constructor({ userAuthenticated, userType, userFullName, isApplicant}) {
    super({
      templateName: 'vacancies-page.hbs',
      renderParams: { userAuthenticated, userType, userFullName, isApplicant},
    });
    this.#vacancyContainer = this._html.querySelector('.content-body__vacancy-container');
    this.#sideColumn = this._html.querySelector('.vacancies-page__side-column');
    this.#sideColumn.style.visibility = 'hidden';
    this._header = this._html.querySelector('.header');
    this.#alertWindows = [];
    this.#vacancies = [];

    this._eventListeners.push({
      event: 'scroll',
      object: window,
      listener: throttle(() => {
        if (
          this.#vacancies.length < 1 ||
          isInViewport(this.#vacancies[this.#vacancies.length - 1])
        ) {
          eventBus.emit(FETCH_VACANCIES);
        }
      }, this.#FEED_LOAD_TIMEOUT),
    });
    addEventListeners(this._eventListeners);
  }

  addAlertWindow(windowRender) {
    if (this.#alertWindows.length == 0) {
      this.#sideColumn.style.visibility = 'visible';
    }
    this.#sideColumn.appendChild(windowRender);
    this.#alertWindows.push(windowRender);
  }

  addVacancy(vacancyRender) {
    this.#vacancyContainer.appendChild(vacancyRender);
    this.#vacancies.push(vacancyRender);
  }
}

const isInViewport = (element) => {
  if (!(element instanceof HTMLElement)) {
    throw TypeError('element must be an instance of HTMLElement');
  }
  const rect = element.getBoundingClientRect();
  const html = document.documentElement;
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || html.clientHeight) &&
    rect.right <= (window.innerWidth || html.clientWidth)
  );
};
