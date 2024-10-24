import { PageController } from '../../modules/Page/Page.js';
import { FETCH_VACANCIES, LOAD_PAGE } from '../../modules/Events/Events.js';

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
    ]);
  }

  async fetchVacancies() {
    const vacancies = await this._model.getVacancies().catch(() => []);
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
}
