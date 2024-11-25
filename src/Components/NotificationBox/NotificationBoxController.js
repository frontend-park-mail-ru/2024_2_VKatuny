import { ComponentController } from '@/modules/Components/Component';
import { NOTIFICATION_STYLE } from './NotificationBoxView';
import { NOTIFICATION_ERROR, NOTIFICATION_OK } from '@/modules/Events/Events';

export class NotificationBoxController extends ComponentController {
  constructor(model, view, component) {
    super(model, view, component);
    this.setHandlers([
      {
        event: NOTIFICATION_ERROR,
        handler: this.errorNotification.bind(this),
      },
      {
        event: NOTIFICATION_OK,
        handler: this.okNotification.bind(this),
      },
    ]);
  }

  errorNotification({ message, timeout }) {
    this._view.addNotification({
      notificationText: message,
      timeoutMs: timeout,
      style: NOTIFICATION_STYLE.ERROR,
    });
  }

  okNotification({ message, timeout }) {
    this._view.addNotification({
      notificationText: message,
      timeoutMs: timeout,
      style: NOTIFICATION_STYLE.OK,
    });
  }
}
