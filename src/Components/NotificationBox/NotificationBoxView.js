import { ComponentView } from '@/modules/Components/Component';

export const NOTIFICATION_STYLE = {
  ERROR: 'error',
  OK: 'ok',
};

const STYLE_TO_CLASS = {};
STYLE_TO_CLASS[NOTIFICATION_STYLE.ERROR] = 'notification_error';
STYLE_TO_CLASS[NOTIFICATION_STYLE.OK] = 'notification_ok';

export class NotificationBoxView extends ComponentView {
  #NOTIFICATION_CAP = 5;
  #NOTIFICATION_CHECK_TIMEOUT = 500;
  #notificationQueue = [];
  #notificationsNum = 0;
  #intervalDescriptor;
  constructor(renderParams, existingElement) {
    super({ renderParams, templateName: null, existingElement });
    this.notificationCallback = this.processNotifications.bind(this);
  }

  addNotification({ notificationText, timeoutMs, style }) {
    const newNotification = this.renderNotification({ notificationText, style });
    this.#notificationQueue.push({ notificationHTML: newNotification, timeout: timeoutMs });
    this.processNotifications();
  }

  processNotifications() {
    if (this.#NOTIFICATION_CAP > this.#notificationsNum) {
      if (this.#intervalDescriptor) {
        clearInterval(this.#intervalDescriptor);
        this.#intervalDescriptor = null;
      }
      if (this.#notificationQueue.length === 0) {
        return;
      }
      const { notificationHTML, timeout } = this.#notificationQueue.shift();
      this.#notificationsNum++;
      this._html.appendChild(notificationHTML);
      setTimeout(
        function () {
          notificationHTML.outerHTML = '';
          this.#notificationsNum--;
        }.bind(this),
        timeout,
      );
    } else {
      if (!this.#intervalDescriptor) {
        this.#intervalDescriptor = setInterval(
          this.notificationCallback,
          this.#NOTIFICATION_CHECK_TIMEOUT,
        );
      }
    }
  }

  renderNotification({ notificationText, style }) {
    const newNotification = document.createElement('div');
    newNotification.classList.add('notification', 'notification-box__notification');
    newNotification.innerText = notificationText;
    switch (style) {
      case NOTIFICATION_STYLE.OK: {
        newNotification.classList.add(STYLE_TO_CLASS[NOTIFICATION_STYLE.OK]);
        break;
      }
      case NOTIFICATION_STYLE.ERROR: {
        newNotification.classList.add(STYLE_TO_CLASS[NOTIFICATION_STYLE.ERROR]);
        break;
      }
    }
    return newNotification;
  }
}
