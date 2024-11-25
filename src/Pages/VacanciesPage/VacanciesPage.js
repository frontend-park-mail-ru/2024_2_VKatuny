import { VacanciesPageController } from './VacanciesPageController';
import { VacanciesPageModel } from './VacanciesPageModel';
import { VacanciesPageView } from './VacanciesPageView';
import { Page } from '@/modules/Page/Page';
import { Header } from '@/Components/Header/Header';
import { SearchContainer } from '@/Components/SearchContainer/SearchContainer';

export class VacanciesPage extends Page {
  constructor({ url }) {
    super({
      url,
      modelClass: VacanciesPageModel,
      viewClass: VacanciesPageView,
      controllerClass: VacanciesPageController,
      viewParams: Header.getViewParams(),
    });
    this._alertWindows = [];
    this._vacancies = [];
  }

  postRenderInit() {
    this._searchContainer = new SearchContainer({
      elementClass: 'vacancies-page__search-container',
      searchByOptions: {
        name: 'searchBy',
        caption: 'Искать по:',
        options: [
          { value: '', caption: 'Всему' },
          { value: 'position', caption: 'Должности' },
          { value: 'company', caption: 'Компании' },
          { value: 'description', caption: 'Описанию' },
        ],
      },
      searchGroupOptions: {
        name: 'searchGroup',
        caption: 'Категория:',
        options: [
          { value: '', caption: 'Все' },
          { value: 'Художник', caption: 'Художник' },
          { value: 'Дизайнер', caption: 'Дизайнер' },
          { value: 'Музыкант', caption: 'Музыкант' },
          { value: 'Фотограф', caption: 'Фотограф' },
          { value: 'Видеограф', caption: 'Видеограф' },
          { value: 'Артист Актёр', caption: 'Артист Актёр' },
          { value: 'Писатель', caption: 'Писатель' },
        ],
      },
    });
    this._children.push(this._searchContainer);
    this._view.addSearchContainer(this._searchContainer.render());
    this._controller.loadPage();
    this._header = new Header({ existingElement: this._view._header });
    this._children.push(this._header);
  }

  bindAlertWindows(alertWindows) {
    this._alertWindows.push(...alertWindows);
    this._children.push(...alertWindows);
  }

  bindVacancies(vacancies) {
    this._vacancies.push(...vacancies);
    // Cleanup handled without internal Component cleanup routine
  }

  clearVacancies() {
    this._vacancies.forEach((vacancy) => {
      vacancy.cleanup();
    });
    this._vacancies = [];
  }

  cleanup() {
    this.clearVacancies();
    super.cleanup();
  }
}
