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
import { ApplicantCvList } from '../../Components/Lists/ApplicantCvList/ApplicantCvList.js';

export const PROFILE_PAGE_PARAMS = {
  USER_ID: 'id',
  USER_TYPE: 'userType',
  STARTING_FRAME: 'from',
};

export const PROFILE_STARTING_FRAMES = {
  PROFILE: 'profile',
  CVS: 'cvList',
  PORTFOLIOS: 'portfolioList',
  VACANCIES: 'vacancyList',
};

export class ProfilePage extends Page {
  #isProfileOwner = false;
  #userId;
  #userType;
  #startFrom;
  constructor({ url }) {
    super({
      url,
      modelClass: ProfilePageModel,
      viewClass: ProfilePageView,
      controllerClass: ProfilePageController,
      viewParams: Header.getViewParams(),
    });
    if (url.pathname === resolveUrl('myProfile').pathname) {
      state.userSession.goToHomePageIfNotLoggedIn();
      this.#isProfileOwner = true;
      this.#userId = state.userSession.userId;
      this.#userType = state.userSession.userType;
    } else {
      this.#userId = +url.searchParams.get(PROFILE_PAGE_PARAMS.USER_ID);
      this.#userType = url.searchParams.get(PROFILE_PAGE_PARAMS.USER_TYPE);
      this.#isProfileOwner =
        this.#userId === state.userSession.userId && this.#userType === state.userSession.userType;
      if (!this.#userId || !this.#userType) {
        throw new NotFoundError();
      }
    }
    switch (url.searchParams.get(PROFILE_PAGE_PARAMS.STARTING_FRAME)) {
      case PROFILE_STARTING_FRAMES.CVS: {
        this.#startFrom =
          this.#userType === USER_TYPE.APPLICANT
            ? PROFILE_STARTING_FRAMES.CVS
            : PROFILE_STARTING_FRAMES.PROFILE;
        break;
      }
      case PROFILE_STARTING_FRAMES.PORTFOLIOS: {
        this.#startFrom =
          this.#userType === USER_TYPE.APPLICANT
            ? PROFILE_STARTING_FRAMES.PORTFOLIOS
            : PROFILE_STARTING_FRAMES.PROFILE;
        break;
      }
      case PROFILE_STARTING_FRAMES.VACANCIES: {
        this.#startFrom =
          this.#userType === USER_TYPE.EMPLOYER
            ? PROFILE_STARTING_FRAMES.VACANCIES
            : PROFILE_STARTING_FRAMES.PROFILE;
        break;
      }
      default: {
        this.#startFrom = PROFILE_STARTING_FRAMES.PROFILE;
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
              frameName: PROFILE_STARTING_FRAMES.PROFILE,
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
            // {
            //   frameName: PROFILE_STARTING_FRAMES.PORTFOLIOS,
            //   frameCaption: 'Портфолио',
            //   frameComponent: new ApplicantPortfolioList({
            //     userId: this.#userId,
            //     isListOwner: this.#isProfileOwner,
            //     elementClass: 'profile-page__portfolio-list',
            //   }),
            // },
            {
              frameName: PROFILE_STARTING_FRAMES.CVS,
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
              frameName: PROFILE_STARTING_FRAMES.PROFILE,
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
              frameName: PROFILE_STARTING_FRAMES.VACANCIES,
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
      startingFrame: this.#startFrom,
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
