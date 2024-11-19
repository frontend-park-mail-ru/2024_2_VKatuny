import { Component } from '@/modules/Components/Component';
import { VacancyArticleView } from './VacancyArticleView';
import { VacancyArticleModel } from './VacancyArticleModel';
import { VacancyArticleController } from './VacancyArticleController';
import { ButtonContainer } from './ButtonContainer/ButtonContainer';
import USER_TYPE from '@/modules/UserSession/UserType';
import { Api } from '@/modules/Api/Api';

export class VacancyArticle extends Component {
  constructor({ elementClass, vacancyId, userId, userType }) {
    super({
      modelClass: VacancyArticleModel,
      modelParams: { vacancyId },
      viewClass: VacancyArticleView,
      controllerClass: VacancyArticleController,
      viewParams: { elementClass },
    });
    this._userId = userId;
    this._userType = userType;
    this._vacancyId = vacancyId;
  }

  async makeButtons() {
    let modelData = {};
    let appliedStatus = {};
    if (this._userType === USER_TYPE.APPLICANT) {
      [modelData, appliedStatus] = await Promise.all([
        this._controller.fetchData(),
        Api.getVacancyApplyStatusById({ id: this._vacancyId }),
      ]);
    } else {
      modelData = await this._controller.fetchData();
    }
    this._buttonContainer = new ButtonContainer({
      isOwner: modelData.employerId === this._userId && this._userType === USER_TYPE.EMPLOYER,
      isApplied: appliedStatus.isSubscribed,
      isApplicant: this._userType === USER_TYPE.APPLICANT,
      ownerId: modelData.employerId,
      vacancyId: this._vacancyId,
    });
    this._children.push(this._buttonContainer);
    this._controller.addButtonContainer(this._buttonContainer);
    this._controller.renderData();
  }

  async getEmployerId() {
    return this._model.getEmployerId();
  }
}
