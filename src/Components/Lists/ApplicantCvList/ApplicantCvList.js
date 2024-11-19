import { Component } from '@/modules/Components/Component';
import { ApplicantCvListModel } from './ApplicantCvListModel';
import { ApplicantCvListController } from './ApplicantCvListController';
import { ApplicantCvListView } from './ApplicantCvListView';
import { ListMixin } from '@/Components/Lists/List/ListMixin';
import { resolveUrl } from '@/modules/UrlUtils/UrlUtils';

export class ApplicantCvList extends Component {
  constructor({ userId, isListOwner, elementClass, existingElement }) {
    super({
      modelClass: ApplicantCvListModel,
      controllerClass: ApplicantCvListController,
      viewClass: ApplicantCvListView,
      viewParams: { elementClass, isOwner: isListOwner, addHref: resolveUrl('createCv') },
      modelParams: { userId, isListOwner },
      existingElement,
    });
    this._controller.loadList();
  }
}

Object.assign(ApplicantCvList.prototype, ListMixin);
