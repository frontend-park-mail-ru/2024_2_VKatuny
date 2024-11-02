import { Header } from '../../Components/Header/Header.js';
import { Page } from '../../modules/Page/Page.js';
import { ProfilePageController } from './ProfilePageController.js';
import { ProfilePageModel } from './ProfilePageModel.js';
import { ProfilePageView } from './ProfilePageView.js';
import state from '/src/modules/AppState/AppState.js';
import { resolveUrl } from '../../modules/UrlUtils/UrlUtils.js';
import { FrameSeries } from '../../Components/FrameSeries/FrameSeries.js';
import { CrudFormBox } from '../../Components/CrudFormBox/CrudFormBox.js';
import { ApplicantProfileForm } from '/src/Components/ApplicantProfileForm/ApplicantProfileForm.js';
import { EmployerProfileForm } from '/src/Components/EmployerProfileForm/EmployerProfileForm.js';
import { NotFoundError } from '../../modules/Router/Router.js';
import USER_TYPE from '../../modules/UserSession/UserType.js';
import { ProfileMinicard } from '../../Components/ProfileMinicard/ProfileMinicard.js';
import { EmployerVacancyList } from '../../Components/Lists/EmployerVacancyList/EmployerVacancyList.js';
import { ApplicantPortfolioList } from '../../Components/Lists/ApplicantPortfolioList/ApplicantPortfolioList.js';
import { ApplicantCvList } from '../../Components/Lists/ApplicantCvList/ApplicantCvList.js';

export const PROFILE_PAGE_PARAMS = {
  USER_ID: 'id',
  USER_TYPE: 'userType',
};

export class ProfilePage extends Page {
  #isProfileOwner = false;
  #userId;
  #userType;
  constructor({ url }) {
    super({
      url,
      modelClass: ProfilePageModel,
      viewClass: ProfilePageView,
      controllerClass: ProfilePageController,
      viewParams: Header.getViewParams(),
    });
    if (url.href === resolveUrl('myProfile').href) {
      state.userSession.goToHomePageIfNotLoggedIn();
      this.#isProfileOwner = true;
      this.#userId = state.userSession.userId;
      this.#userType = state.userSession.userType;
    } else {
      this.#userId = url.searchParams.get(PROFILE_PAGE_PARAMS.USER_ID);
      this.#userType = url.searchParams.get(PROFILE_PAGE_PARAMS.USER_TYPE);
      this.#isProfileOwner =
        this.#userId === state.userSession.userId && this.#userType === state.userSession.userType;
      if (!this.#userId || !this.#userType) {
        throw new NotFoundError();
      }
    }
  }

  postRenderInit() {
    this._header = new Header({
      existingElement: this._view._header,
    });
    const frames =
      this.#userType === USER_TYPE.APPLICANT
        ? [
            {
              frameName: 'personalInfo',
              frameCaption: 'Профиль',
              frameComponent: new CrudFormBox({
                form: new ApplicantProfileForm({
                  elementClass: 'profile-page__applicant-profile-form',
                  userId: this.#userId,
                }),
                canUpdate: this.#isProfileOwner,
                elementClass: 'profile-page__personal-data',
              }),
            },
            {
              frameName: 'portfolioList',
              frameCaption: 'Портфолио',
              frameComponent: new ApplicantPortfolioList({
                userId: this.#userId,
                isListOwner: this.#isProfileOwner,
                elementClass: 'profile-page__portfolio-list',
              }),
            },
            {
              frameName: 'cvList',
              frameCaption: 'Резюме',
              frameComponent: new ApplicantCvList({
                userId: this.#userId,
                isListOwner: this.#isProfileOwner,
                elementClass: 'profile-page__cv-list',
              }),
            },
          ]
        : [
            {
              frameName: 'personalInfo',
              frameCaption: 'Профиль',
              frameComponent: new CrudFormBox({
                form: new EmployerProfileForm({
                  elementClass: 'profile-page__employer-profile-form',
                  userId: this.#userId,
                }),
                canUpdate: this.#isProfileOwner,
                elementClass: 'profile-page__personal-data',
              }),
            },
            {
              frameName: 'vacanciesList',
              frameCaption: 'Вакансии',
              frameComponent: new EmployerVacancyList({
                userId: this.#userId,
                isListOwner: this.#isProfileOwner,
                elementClass: 'profile-page__vacancies-list',
              }),
            },
          ];
    this._frameSeries = new FrameSeries({
      frames,
      existingElement: this._view._frameSeries,
    });
    this._children.push(this._frameSeries);

    this._profileMinicard = new ProfileMinicard({
      userId: this.#userId,
      userType: this.#userType,
      existingElement: this._view.profileMinicard,
    });
    this._children.push(this._profileMinicard);
  }
}
