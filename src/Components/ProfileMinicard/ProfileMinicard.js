import { Component } from '../../modules/Components/Component.js';
import { ProfileMinicardView } from './ProfileMinicardView.js';
import { ProfileMinicardController } from './ProfileMinicardController.js';
import { ProfileMinicardModel } from './ProfileMinicardModel.js';

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
