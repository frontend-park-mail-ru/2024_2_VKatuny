import { PageController } from '../../modules/Page/Page.js';

export class CvEditPageController extends PageController {
  constructor(model, view, component) {
    super(model, view, component);
  }

  addCvForm(cvForm) {
    this._view.addCvForm(cvForm.render());
  }
}
