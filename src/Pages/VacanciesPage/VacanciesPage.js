import { VacanciesPageController } from './VacanciesPageController.js';
import { VacanciesPageModel } from './VacanciesPageModel.js';
import { VacanciesPageView } from './VacanciesPageView.js';
import { Page } from '../../modules/Page/Page.js';
import { Header } from '../../Components/Header/Header.js';
import { SearchBar } from '@/Components/SearchBar/SearchBar.js';

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
    this._searchBar = new SearchBar({ elementClass: 'vacancies-page__search-container' });
    this._children.push(this._searchBar);
    this._view.addSearchBar(this._searchBar.render());
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
