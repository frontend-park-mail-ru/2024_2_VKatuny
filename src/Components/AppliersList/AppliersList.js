import { Component } from '../../modules/Components/Component.js';
import { AppliersListModel } from './AppliersListModel.js';
import { AppliersListController } from './AppliersListController.js';
import { AppliersListView } from './AppliersListView.js';
import { ListMixin } from '../Lists/List/ListMixin.js';

export class AppliersList extends Component {
  constructor({ vacancyId, elementClass, existingElement }) {
    super({
      modelClass: AppliersListModel,
      controllerClass: AppliersListController,
      viewClass: AppliersListView,
      viewParams: { elementClass },
      modelParams: { vacancyId },
      existingElement,
    });
    this._controller.fillList();
  }
}

Object.assign(AppliersList.prototype, ListMixin);
