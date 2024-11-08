import { Component } from '../../modules/Components/Component.js';
import { CvArticleController } from './CvArticleController.js';
import { CvArticleModel } from './CvArticleModel.js';
import { CvArticleView } from './CvArticleView.js';
import { ButtonContainer } from './ButtonContainer/ButtonContainer.js';
import USER_TYPE from '../../modules/UserSession/UserType.js';

export class CvArticle extends Component {
  constructor({ elementClass, cvId, userId, userType }) {
    super({
      modelClass: CvArticleModel,
      modelParams: { cvId },
      viewClass: CvArticleView,
      controllerClass: CvArticleController,
      viewParams: { elementClass },
    });
    this._userId = userId;
    this._userType = userType;
    this._cvId = cvId;
  }

  async makeButtons() {
    const modelData = await this._controller.fetchData();
    this._buttonContainer = new ButtonContainer({
      isOwner: modelData.applicantId === this._userId && this._userType === USER_TYPE.APPLICANT,
      isEmployer: this._userType === USER_TYPE.EMPLOYER,
      ownerId: modelData.applicantId,
      cvId: this._cvId,
    });
    this._children.push(this._buttonContainer);
    this._controller.addButtonContainer(this._buttonContainer);
    this._controller.renderData();
  }

  async getApplicantId() {
    return this._model.getApplicantId();
  }
}
