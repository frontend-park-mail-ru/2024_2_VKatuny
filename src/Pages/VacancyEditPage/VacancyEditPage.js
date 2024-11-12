import { Header } from '../../Components/Header/Header.js';
import state from '../../modules/AppState/AppState.js';
import { Page } from '../../modules/Page/Page.js';
import { ForbiddenPage, NotFoundError } from '../../modules/Router/Router.js';
import { resolveUrl } from '@/modules/UrlUtils/UrlUtils';
import { VacancyEditPageController } from './VacancyEditPageController.js';
import { VacancyEditPageModel } from './VacancyEditPageModel.js';
import { VacancyEditPageView } from './VacancyEditPageView.js';
import { VacancyForm } from '../../Components/VacancyForm/VacancyForm.js';
import USER_TYPE from '../../modules/UserSession/UserType.js';
import { zip } from '../../modules/ObjectUtils/Zip.js';

export class VacancyEditPage extends Page {
  #vacancyId;

  static VACANCY_ID_PARAM = 'id';

  constructor({ url }) {
    if (state.userSession.userType !== USER_TYPE.EMPLOYER) {
      throw new ForbiddenPage(resolveUrl('vacancies'));
    }
    let vacancyId;
    switch (url.pathname) {
      case resolveUrl('editVacancy').pathname: {
        vacancyId = +url.searchParams.get(VacancyEditPage.VACANCY_ID_PARAM);
        if (!vacancyId) {
          throw new NotFoundError();
        }
        break;
      }
      case resolveUrl('createVacancy').pathname: {
        vacancyId = null;
        break;
      }
    }
    super({
      url,
      modelClass: VacancyEditPageModel,
      viewClass: VacancyEditPageView,
      controllerClass: VacancyEditPageController,
      viewParams: zip(Header.getViewParams(), { isNew: !vacancyId }),
    });
    this.#vacancyId = vacancyId;
  }

  postRenderInit() {
    this._header = new Header({
      existingElement: this._view.header,
    });
    this._children.push(this._header);
    this._vacancyForm = new VacancyForm({
      userId: state.userSession.userId,
      vacancyId: this.#vacancyId,
      elementClass: 'vacancy-edit-page__vacancy-form',
    });
    this._children.push(this._vacancyForm);
    this._controller.addVacancyForm(this._vacancyForm);
  }
}
