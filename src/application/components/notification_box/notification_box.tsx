import { Component } from '@/modules/vdom/virtual_node';
import * as vdom from '@/modules/vdom/virtual_dom';
import { Notification, NotificationStyle } from '@/application/models/notification';
import { notificationStore } from '@/application/stores/notification_store/notification_store';
import { notificationActionCreators } from '@/application/action_creators/notification_action_creators';
import './notification_box.scss';

export class NotificationBox extends Component {
  private static NOTIFICATION_CAP = 5;
  private static NOTIFICATION_UPDATE_TIMEOUT = 500;
  private renderedNotifications: Array<Notification> = [];
  private intervalDescriptor: NodeJS.Timeout;

  didMount(): void {
    this.intervalDescriptor = setInterval(
      this.updateNotificationsQueue.bind(this),
      NotificationBox.NOTIFICATION_UPDATE_TIMEOUT,
    );
  }

  updateNotificationsQueue() {
    if (this.renderedNotifications.length < NotificationBox.NOTIFICATION_CAP) {
      const toSendNotifications = notificationStore.getData().notifications;
      if (!toSendNotifications) {
        return;
      }
      const toRenderNotifications = toSendNotifications.slice(
        0,
        NotificationBox.NOTIFICATION_CAP - this.renderedNotifications.length,
      );
      toRenderNotifications.forEach((notification) => {
        this.renderedNotifications.push(notification);
        notificationActionCreators.readNotification(notification);
        setTimeout(() => {
          this.removeNotificationRendered(notification);
        }, notification.timeoutMs);
      });
    }
  }

  removeNotificationRendered(notification: Notification) {
    this.renderedNotifications = this.renderedNotifications.filter(
      (renderedNotification) => renderedNotification.text !== notification.text,
    );
    this.domNode.virtualNode.root.update();
  }

  renderNotification({
    notificationText,
    style,
  }: {
    notificationText: string;
    style: NotificationStyle;
  }) {
    return (
      <div
        key={notificationText}
        className={`notification notification-box__notification ${style}`}
      >
        {notificationText}
      </div>
    );
  }

  willDestroy(): void {
    if (this.intervalDescriptor) {
      clearInterval(this.intervalDescriptor);
      this.intervalDescriptor = null;
    }
    super.willDestroy();
  }

  render() {
    return (
      <div key="notification-box" className="notification-box">
        {this.renderedNotifications &&
          this.renderedNotifications.map((notification) =>
            this.renderNotification({
              notificationText: notification.text,
              style: notification.style,
            }),
          )}
      </div>
    );
  }
}
