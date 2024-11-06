import { ComponentController } from '../../modules/Components/Component.js';

export class VacancyArticleController extends ComponentController {
  constructor(model, view, component) {
    super(model, view, component);
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
}
