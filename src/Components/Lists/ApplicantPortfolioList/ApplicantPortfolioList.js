import { Component } from '@/modules/Components/Component';
import { ApplicantPortfolioListModel } from './ApplicantPortfolioListModel';
import { ApplicantPortfolioListController } from './ApplicantPortfolioListController';
import { ApplicantPortfolioListView } from './ApplicantPortfolioListView';
import { ListMixin } from '@/Components/Lists/List/ListMixin';

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
