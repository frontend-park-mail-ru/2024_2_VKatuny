import { ComponentController } from '../../modules/Components/Component.js';
import { GO_TO, REDIRECT_TO, VACANCY_DELETE, VACANCY_EDIT } from '../../modules/Events/Events.js';
import { resolveUrl } from '../../modules/UrlUtils/UrlUtils.js';
import eventBus from '../../modules/Events/EventBus.js';
import { VacancyEditPage } from '../../Pages/VacancyEditPage/VacancyEditPage.js';

export class VacancyArticleController extends ComponentController {
  constructor(model, view, component) {
    super(model, view, component);
    this.setHandlers([
      {
        event: VACANCY_DELETE,
        handler: this.vacancyDelete.bind(this),
      },
      {
        event: VACANCY_EDIT,
        handler: this.vacancyEdit.bind(this),
      },
    ]);
  }

  async fetchData() {
    return this._model.getVacancyData();
  }

  async renderData() {
    return this._view.renderData(await this._model.getVacancyData());
  }

  addButtonContainer(container) {
    this._view.addButtonContainer(container.render());
  }

  async vacancyDelete() {
    const deleted = await this._model.vacancyDelete();
    if (deleted) {
      eventBus.emit(REDIRECT_TO, { redirectUrl: resolveUrl('myProfile') });
    }
  }

  async vacancyEdit() {
    const query = {};
    const vacancy = await this._model.getVacancyData();
    query[VacancyEditPage.VACANCY_ID_PARAM] = vacancy.id;
    eventBus.emit(GO_TO, { redirectUrl: resolveUrl('editVacancy', query) });
  }
}
