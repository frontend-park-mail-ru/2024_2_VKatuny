import { Header } from '@/Components/Header/Header';
import { ProfileMinicard } from '@/Components/ProfileMinicard/ProfileMinicard';
import state from '@/modules/AppState/AppState';
import { Page } from '@/modules/Page/Page';
import { NotFoundError } from '@/modules/Router/Router';
import USER_TYPE from '@/modules/UserSession/UserType';
import { CvPageController } from './CvPageController';
import { CvPageModel } from './CvPageModel';
import { CvPageView } from './CvPageView';
import { CvArticle } from '@/Components/CvArticle/CvArticle';
import { zip } from '@common_utils/object_utils/zip';

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
