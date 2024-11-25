import { Component } from '@/modules/Components/Component';
import { EmployerVacancyListModel } from './EmployerVacancyListModel';
import { EmployerVacancyListController } from './EmployerVacancyListController';
import { EmployerVacancyListView } from './EmployerVacancyListView';
import { ListMixin } from '@/Components/Lists/List/ListMixin';
import { resolveUrl } from '@/modules/UrlUtils/UrlUtils';

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
