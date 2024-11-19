import { Component } from '@/modules/Components/Component';
import { ProfileMinicardView } from './ProfileMinicardView';
import { ProfileMinicardController } from './ProfileMinicardController';
import { ProfileMinicardModel } from './ProfileMinicardModel';

export class ProfileMinicard extends Component {
  constructor({ userId, userType, existingElement }) {
    super({
      modelClass: ProfileMinicardModel,
      viewClass: ProfileMinicardView,
      controllerClass: ProfileMinicardController,
      modelParams: { userId, userType },
      existingElement,
    });
    this._controller.updateInfo();
  }
}
