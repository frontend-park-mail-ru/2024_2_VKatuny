import { PageController } from '../../modules/Page/Page.js';

export class CvPageController extends PageController {
  constructor(model, view, component) {
    super(model, view, component);
  }

  addCvArticle(cvArticle) {
    this._view.addCvArticle(cvArticle.render());
  }
}
