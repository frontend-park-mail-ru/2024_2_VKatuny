import { Component } from '../../../modules/Components/Component.js';
import { EmployerVacancyListModel } from './EmployerVacancyListModel.js';
import { EmployerVacancyListController } from './EmployerVacancyListController.js';
import { EmployerVacancyListView } from './EmployerVacancyListView.js';
import { ListMixin } from '../List/ListMixin.js';
import { resolveUrl } from '../../../modules/UrlUtils/UrlUtils.js';

export class EmployerVacancyList extends Component {
  constructor({ userId, isListOwner, elementClass, existingElement }) {
    super({
      modelClass: EmployerVacancyListModel,
      controllerClass: EmployerVacancyListController,
      viewClass: EmployerVacancyListView,
      viewParams: { elementClass, isOwner: isListOwner, addHref: resolveUrl('createVacancy') },
      modelParams: { userId, isListOwner },
      existingElement,
    });
    this._controller.loadList();
  }
}

Object.assign(EmployerVacancyList.prototype, ListMixin);
