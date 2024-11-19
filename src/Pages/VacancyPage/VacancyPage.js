import { Header } from '@/Components/Header/Header';
import { ProfileMinicard } from '@/Components/ProfileMinicard/ProfileMinicard';
import state from '@/modules/AppState/AppState';
import { Page } from '@/modules/Page/Page';
import { NotFoundError } from '@/modules/Router/Router';
import USER_TYPE from '@/modules/UserSession/UserType';
import { VacancyPageController } from './VacancyPageController';
import { VacancyPageModel } from './VacancyPageModel';
import { VacancyPageView } from './VacancyPageView';
import { VacancyArticle } from '@/Components/VacancyArticle/VacancyArticle';
import { AppliersList } from '@/Components/AppliersList/AppliersList';
import { zip } from '@/modules/ObjectUtils/Zip';

export class VacancyPage extends Page {
  #vacancyId;
  #userType;
  #userId;
  #employerId;

  static VACANCY_ID_PARAM = 'id';

  constructor({ url }) {
    super({
      url,
      modelClass: VacancyPageModel,
      viewClass: VacancyPageView,
      controllerClass: VacancyPageController,
      viewParams: zip(Header.getViewParams(), { isAuthorized: state.userSession.isLoggedIn }),
    });
    this.#vacancyId = +url.searchParams.get(VacancyPage.VACANCY_ID_PARAM);
    if (!this.#vacancyId) {
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
    this._vacancyArticle = new VacancyArticle({
      elementClass: '.vacancy-page__vacancy-article',
      userId: this.#userId,
      vacancyId: this.#vacancyId,
      userType: this.#userType,
    });
    await this._vacancyArticle.makeButtons();
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

    if (this.#userType === USER_TYPE.EMPLOYER && this.#userId === this.#employerId) {
      this._appliersList = new AppliersList({
        elementClass: 'vacancy-page__appliers-list',
        vacancyId: this.#vacancyId,
      });
      this._children.push(this._appliersList);
      this._view.addAppliersList(this._appliersList.render());
    }
  }
}
