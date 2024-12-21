import { storeManager } from '@/modules/store_manager/store_manager';
import { Notification } from '../models/notification';
import {
  NotificationAction,
  ReadNotificationAction,
  ReadNotificationActionPayload,
} from '../stores/notification_store/notification_actions';

function addNotifications(...notifications: Notification[]) {
  storeManager.dispatch({
    type: NotificationAction.Add,
    payload: {
      notifications,
    },
  });
}

function readNotification(notification: Notification) {
  storeManager.dispatch({
    type: NotificationAction.Read,
    payload: {
      notification,
    } as ReadNotificationActionPayload,
  } as ReadNotificationAction);
}

function clearNotifications() {
  storeManager.dispatch({
    type: NotificationAction.Clear,
  });
}

export const notificationActionCreators = {
  addNotifications,
  readNotification,
  clearNotifications,
};
