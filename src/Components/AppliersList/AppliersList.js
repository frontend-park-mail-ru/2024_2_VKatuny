import { Component } from '@/modules/Components/Component';
import { AppliersListModel } from './AppliersListModel';
import { AppliersListController } from './AppliersListController';
import { AppliersListView } from './AppliersListView';
import { ListMixin } from '@/Components/Lists/List/ListMixin';

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
