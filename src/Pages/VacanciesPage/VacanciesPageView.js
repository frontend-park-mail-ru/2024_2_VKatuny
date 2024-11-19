import { FETCH_VACANCIES } from '@/modules/Events/Events';
import { addEventListeners } from '@/modules/Events/EventUtils';
import { PageView } from '@/modules/Page/Page';
import { throttle } from '@/modules/Decorators/Decorators';
import eventBus from '@/modules/Events/EventBus';
import VacanciesPageHtml from './vacancies-page.hbs';

export class VacanciesPageView extends PageView {
  #sideColumn;
  #vacancyContainer;
  #alertWindows;
  #sideColumnChildren;
  #vacancies;
  #vacancyHeader;

  #FEED_LOAD_TIMEOUT = 500;
  constructor(renderParams) {
    super({
      template: VacanciesPageHtml,
      renderParams: renderParams,
    });
    this.#vacancyContainer = this._html.querySelector('.content-body__vacancy-container');
    this.#vacancyHeader = this._html.querySelector('.content-body__header');
    this.#sideColumn = this._html.querySelector('.vacancies-page__side-column');
    this.#sideColumn.style.visibility = 'hidden';
    this._header = this._html.querySelector('.header');
    this.#alertWindows = [];
    this.#sideColumnChildren = [];
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
    this.addToSideColumn(windowRender);
    this.#alertWindows.push(windowRender);
  }

  addVacancy(vacancyRender) {
    this.#vacancyContainer.appendChild(vacancyRender);
    this.#vacancies.push(vacancyRender);
  }

  addSearchBar(searchBarRender) {
    this.addToSideColumn(searchBarRender);
  }

  addToSideColumn(itemRender) {
    if (this.#sideColumnChildren.length === 0) {
      this.#sideColumn.style.visibility = 'visible';
    }
    this.#sideColumn.appendChild(itemRender);
  }

  clearVacancies() {
    this.#vacancies = [];
    this.#vacancyContainer.innerHTML = '';
  }

  setVacancyHeader(newText) {
    this.#vacancyHeader.innerText = newText;
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
