import { PageController } from '../../modules/Page/Page.js';

export class VacancyEditPageController extends PageController {
  constructor(model, view, component) {
    super(model, view, component);
  }

  addVacancyForm(vacancyForm) {
    this._view.addVacancyForm(vacancyForm.render());
  }
}
