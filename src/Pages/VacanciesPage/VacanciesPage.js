import { VacanciesPageController } from './VacanciesPageController.js';
import { VacanciesPageModel } from './VacanciesPageModel.js';
import { VacanciesPageView } from './VacanciesPageView.js';
import state from '/src/modules/AppState/AppState.js';
import { Page } from '../../modules/Page/Page.js';
import { Header } from '../../Components/Header/Header.js';
import { USER_TYPES } from '../../modules/UserSession/UserSession.js';

export class VacanciesPage extends Page {
  constructor({ url }) {
    super({
      url,
      modelClass: VacanciesPageModel,
      viewClass: VacanciesPageView,
      controllerClass: VacanciesPageController,
      viewParams: {
        userAuthenticated: state.userSession.isLoggedIn,
        userType: state.userSession.userType,
        isApplicant: state.userSession.userType === USER_TYPES['applicant'],
        userFullName: state.userSession.getUserFullName(),
      },
    });
    this._alertWindows = [];
    this._vacancies = [];
  }

  postRenderInit() {
    this._controller.loadPage();
    this._header = new Header({}, this._view._header);
    this._children.push(this._header);
  }

  bindAlertWindows(alertWindows) {
    this._alertWindows.push(...alertWindows);
    this._children.push(...alertWindows);
  }

  bindVacancies(vacancies) {
    this._vacancies.push(...vacancies);
    this._children.push(...vacancies);
  }
}
