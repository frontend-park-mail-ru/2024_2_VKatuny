import { NotificationBoxController } from './NotificationBoxController';
import { NotificationBoxModel } from './NotificationBoxModel';
import { NotificationBoxView } from './NotificationBoxView';
import { Component } from '@/modules/Components/Component';

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
