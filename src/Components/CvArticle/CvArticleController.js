import { ComponentController } from '../../modules/Components/Component.js';
import { GO_TO, REDIRECT_TO, CV_DELETE, CV_EDIT } from '../../modules/Events/Events.js';
import { resolveUrl } from '../../modules/UrlUtils/UrlUtils.js';
import { CvPage } from '../../Pages/CvPage/CvPage.js';
import eventBus from '../../modules/Events/EventBus.js';

export class CvArticleController extends ComponentController {
  constructor(model, view, component) {
    super(model, view, component);
    this.setHandlers([
      {
        event: CV_DELETE,
        handler: this.cvDelete.bind(this),
      },
      {
        event: CV_EDIT,
        handler: this.cvEdit.bind(this),
      },
    ]);
  }

  async fetchData() {
    return this._model.getCvData();
  }

  async renderData() {
    return this._view.renderData(await this._model.getCvData());
  }

  addButtonContainer(container) {
    this._view.addButtonContainer(container.render());
  }

  async cvDelete() {
    const deleted = await this._model.cvDelete();
    if (deleted) {
      eventBus.emit(REDIRECT_TO, { redirectUrl: resolveUrl('myProfile') });
    }
  }

  async cvEdit() {
    const query = {};
    const cv = await this._model.getCvData();
    query[CvPage.CV_ID] = cv.id;
    eventBus.emit(GO_TO, { redirectUrl: resolveUrl('editCv', query) });
    throw Error('Not implemented');
  }
}
