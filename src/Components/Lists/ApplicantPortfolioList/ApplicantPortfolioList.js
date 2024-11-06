import { Component } from '../../../modules/Components/Component.js';
import { ApplicantPortfolioListModel } from './ApplicantPortfolioListModel.js';
import { ApplicantPortfolioListController } from './ApplicantPortfolioListController.js';
import { ApplicantPortfolioListView } from './ApplicantPortfolioListView.js';
import { ListMixin } from '../List/ListMixin.js';

export class ApplicantPortfolioList extends Component {
  constructor({ userId, isListOwner, elementClass, existingElement }) {
    super({
      modelClass: ApplicantPortfolioListModel,
      controllerClass: ApplicantPortfolioListController,
      viewClass: ApplicantPortfolioListView,
      viewParams: { elementClass },
      modelParams: { userId, isListOwner },
      existingElement,
    });
    this._controller.loadList();
  }
}

Object.assign(ApplicantPortfolioList.prototype, ListMixin);
