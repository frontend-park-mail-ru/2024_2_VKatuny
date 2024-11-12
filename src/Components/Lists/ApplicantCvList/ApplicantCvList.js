import { Component } from '../../../modules/Components/Component.js';
import { ApplicantCvListModel } from './ApplicantCvListModel.js';
import { ApplicantCvListController } from './ApplicantCvListController.js';
import { ApplicantCvListView } from './ApplicantCvListView.js';
import { ListMixin } from '../List/ListMixin.js';
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
