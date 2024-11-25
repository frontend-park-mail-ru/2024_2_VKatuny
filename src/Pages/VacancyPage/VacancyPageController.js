import { PageController } from '@/modules/Page/Page';

export class VacancyPageController extends PageController {
  constructor(model, view, component) {
    super(model, view, component);
  }

  addVacancyArticle(vacancyArticle) {
    this._view.addVacancyArticle(vacancyArticle.render());
  }
}
