import { NotificationBoxController } from './NotificationBoxController.js';
import { NotificationBoxModel } from './NotificationBoxModel.js';
import { NotificationBoxView } from './NotificationBoxView.js';
import { Component } from '../../modules/Components/Component.js';

export const NOTIFICATION_TIMEOUT = {
  LONG: 3000,
  MEDIUM: 2000,
  SHORT: 1000,
};

export class NotificationBox extends Component {
  constructor({ existingElement }) {
    super({
      modelClass: NotificationBoxModel,
      controllerClass: NotificationBoxController,
      viewClass: NotificationBoxView,
      existingElement,
    });
  }
}
