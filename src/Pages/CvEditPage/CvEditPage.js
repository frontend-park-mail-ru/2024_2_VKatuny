import { Header } from '../../Components/Header/Header.js';
import state from '../../modules/AppState/AppState.js';
import { Page } from '../../modules/Page/Page.js';
import { ForbiddenPage, NotFoundError } from '../../modules/Router/Router.js';
import { resolveUrl } from '@/modules/UrlUtils/UrlUtils';
import { CvEditPageController } from './CvEditPageController.js';
import { CvEditPageModel } from './CvEditPageModel.js';
import { CvEditPageView } from './CvEditPageView.js';
import { CvForm } from '../../Components/CvForm/CvForm.js';
import USER_TYPE from '../../modules/UserSession/UserType.js';
import { zip } from '../../modules/ObjectUtils/Zip.js';

export class CvEditPage extends Page {
  #cvId;

  static CV_ID_PARAM = 'id';

  constructor({ url }) {
    if (state.userSession.userType !== USER_TYPE.APPLICANT) {
      throw new ForbiddenPage(resolveUrl('vacancies'));
    }
    let cvId;
    switch (url.pathname) {
      case resolveUrl('editCv').pathname: {
        cvId = +url.searchParams.get(CvEditPage.CV_ID_PARAM);
        if (!cvId) {
          throw new NotFoundError();
        }
        break;
      }
      case resolveUrl('createCv').pathname: {
        cvId = null;
        break;
      }
    }
    super({
      url,
      modelClass: CvEditPageModel,
      viewClass: CvEditPageView,
      controllerClass: CvEditPageController,
      viewParams: zip(Header.getViewParams(), { isNew: !cvId }),
    });
    this.#cvId = cvId;
  }

  postRenderInit() {
    this._header = new Header({
      existingElement: this._view.header,
    });
    this._children.push(this._header);

    this._cvForm = new CvForm({
      userId: state.userSession.userId,
      cvId: this.#cvId,
      elementClass: 'cv-edit-page__cv-form',
    });
    this._children.push(this._cvForm);
    this._controller.addCvForm(this._cvForm);
  }
}
