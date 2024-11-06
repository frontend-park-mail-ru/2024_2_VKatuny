import { Header } from '../../Components/Header/Header.js';
import { ProfileMinicard } from '../../Components/ProfileMinicard/ProfileMinicard.js';
import state from '../../modules/AppState/AppState.js';
import { Page } from '../../modules/Page/Page.js';
import { NotFoundError } from '../../modules/Router/Router.js';
import USER_TYPE from '../../modules/UserSession/UserType.js';
import { VacancyPageController } from './VacancyPageController.js';
import { VacancyPageModel } from './VacancyPageModel.js';
import { VacancyPageView } from './VacancyPageView.js';
import { VacancyArticle } from '../../Components/VacancyArticle/VacancyArticle.js';

export class VacancyPage extends Page {
  #vacancyId;
  #userType;
  #userId;
  #employerId;

  VACANCY_ID_PARAM = 'id';

  constructor({ url }) {
    super({
      url,
      modelClass: VacancyPageModel,
      viewClass: VacancyPageView,
      controllerClass: VacancyPageController,
      viewParams: Header.getViewParams(),
    });
    this.#vacancyId = +url.searchParams.get(this.VACANCY_ID_PARAM);
    if (!this.#vacancyId) {
      throw new NotFoundError();
    }
    this.#userType = state.userSession.userType;
    this.#userId = state.userSession.userId;
  }

  postRenderInit() {
    this._header = new Header({
      existingElement: this._view.header,
    });
    this._children.push(this._header);
    this._vacancyArticle = new VacancyArticle({
      elementClass: '.vacancy-page__vacancy-article',
      userId: this.#userId,
      vacancyId: this.#vacancyId,
      userType: this.#userType,
    });
    this._vacancyArticle.makeButtons().then(async () => {
      this.#employerId = await this._vacancyArticle.getEmployerId();
      this._controller.addVacancyArticle(this._vacancyArticle);
      this._children.push(this._vacancyArticle);
      if (this.#userType !== USER_TYPE.EMPLOYER) {
        this._profileMinicard = new ProfileMinicard({
          userId: this.#employerId,
          userType: USER_TYPE.EMPLOYER,
          existingElement: this._view.profileMinicard,
        });
        this._children.push(this._profileMinicard);
      }
    });
  }
}
