import { Header } from '../../Components/Header/Header.js';
import { ProfileMinicard } from '../../Components/ProfileMinicard/ProfileMinicard.js';
import state from '../../modules/AppState/AppState.js';
import { Page } from '../../modules/Page/Page.js';
import { NotFoundError } from '../../modules/Router/Router.js';
import USER_TYPE from '../../modules/UserSession/UserType.js';
import { CvPageController } from './CvPageController.js';
import { CvPageModel } from './CvPageModel.js';
import { CvPageView } from './CvPageView.js';
import { CvArticle } from '../../Components/CvArticle/CvArticle.js';
import { zip } from '../../modules/ObjectUtils/Zip.js';

export class CvPage extends Page {
  #cvId;
  #userType;
  #userId;
  #applicantId;

  static CV_ID_PARAM = 'id';

  constructor({ url }) {
    super({
      url,
      modelClass: CvPageModel,
      viewClass: CvPageView,
      controllerClass: CvPageController,
      viewParams: zip(Header.getViewParams(), { isAuthorized: state.userSession.isLoggedIn }),
    });
    this.#cvId = +url.searchParams.get(CvPage.CV_ID_PARAM);
    if (!this.#cvId) {
      throw new NotFoundError();
    }
    this.#userType = state.userSession.userType;
    this.#userId = state.userSession.userId;
  }

  async postRenderInit() {
    this._header = new Header({
      existingElement: this._view.header,
    });
    this._children.push(this._header);

    this._cvArticle = new CvArticle({
      elementClass: '.vacancy-page__vacancy-article',
      userId: this.#userId,
      cvId: this.#cvId,
      userType: this.#userType,
    });
    await this._cvArticle.makeButtons();
    this.#applicantId = await this._cvArticle.getApplicantId();
    this._controller.addCvArticle(this._cvArticle);
    this._children.push(this._cvArticle);

    this._profileMinicard = new ProfileMinicard({
      userId: this.#applicantId,
      userType: USER_TYPE.APPLICANT,
      existingElement: this._view.profileMinicard,
    });
    this._children.push(this._profileMinicard);
  }
}
