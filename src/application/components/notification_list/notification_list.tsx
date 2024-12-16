import { Component } from '@/modules/vdom/virtual_node';
import * as vdom from '@/modules/vdom/virtual_dom';
import { Notification } from '@/modules/api/src/responses/notification';
import { userStore } from '@/application/stores/user_store/user_store';
import './notification_list.scss';

export interface NotificationListProps {
  elementClass?: string;
  notifications: Array<Notification>;
}

export class NotificationList extends Component {
  render() {
    const unreadNotifications = (this.props.notifications as Notification[]).filter(
      (notification) => !notification.isRead,
    );
    return (
      <div className={`${this.props.elementClass} notification-list`}>
        {unreadNotifications.map((notification) => {
          return (
            <div
              className="notification-list__notification"
              onHover={() => {
                const notificationManager = userStore.getData().notificationManager;
                if (notificationManager) {
                  notificationManager.setNotificationRead(notification.id);
                }
              }}
            >
              <div className="notification-list__notification-text">
                {notification.notificationText}
              </div>
              <div className="notification-list__createdAt">
                {new Date(notification.createdAt).toLocaleDateString('ru-RU')}
              </div>
            </div>
          );
        }) && (
          <div key="empty" className="notification-list__empty">
            Новых уведомлений нет
          </div>
        )}
      </div>
    );
  }
}
