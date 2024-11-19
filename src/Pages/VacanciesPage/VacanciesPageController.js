import { PageController } from '@/modules/Page/Page';
import { FETCH_VACANCIES, LOAD_PAGE, SUBMIT_SEARCH } from '@/modules/Events/Events';

export class VacanciesPageController extends PageController {
  constructor(model, view, component) {
    super(model, view, component);
    this.setHandlers([
      {
        event: FETCH_VACANCIES,
        handler: this.fetchVacancies.bind(this),
      },
      {
        event: LOAD_PAGE,
        handler: this.loadPage.bind(this),
      },
      {
        event: SUBMIT_SEARCH,
        handler: this.handleSubmitSearch.bind(this),
      },
    ]);
  }

  async fetchVacancies() {
    const vacancies = await this._model.getVacancies();
    this._component.bindVacancies(vacancies);
    vacancies.forEach((vacancy) => {
      this._view.addVacancy(vacancy.view.render());
    });
  }

  loadAlertWindows() {
    const alertWindows = this._model.getAlertWindows();
    this._component.bindAlertWindows(alertWindows);
    alertWindows.forEach((alertWindow) => {
      this._view.addAlertWindow(alertWindow.view.render());
    });
  }

  loadPage() {
    this.loadAlertWindows();
    this.fetchVacancies();
  }

  handleSubmitSearch({ searchInput }) {
    if (!this._model.needToFetch(searchInput)) {
      return;
    }
    this._model.submitSearch(searchInput);
    this._component.clearVacancies();
    this._view.clearVacancies();
    this._view.setVacancyHeader(this._model.getVacancyHeader());
    this.fetchVacancies();
  }
}
