import { NotificationAction } from './notification_actions';
import { Action } from '@/modules/store_manager/action';
import {
  AddNotificationActionPayload,
  ReadNotificationActionPayload,
} from './notification_actions';
import { Notification } from '@/application/models/notification';
import { storeManager } from '@/modules/store_manager/store_manager';
import { Store } from '@/modules/store_manager/store';

export interface NotificationStoreData {
  notifications: Notification[];
}

function notificationStoreReducer(state: NotificationStoreData, action: Action) {
  switch (action.type) {
    case NotificationAction.Add: {
      const payload = action.payload as AddNotificationActionPayload;
      if (!state.notifications) {
        state.notifications = [];
      }
      state.notifications.push(...payload.notifications);
      return state;
    }

    case NotificationAction.Read: {
      const payload = action.payload as ReadNotificationActionPayload;
      const toRemove = payload.notification;
      state.notifications = state.notifications.filter(
        (notification) => notification.text !== toRemove.text,
      );
      return state;
    }
    case NotificationAction.Clear: {
      state.notifications = [];
      return state;
    }
  }
  return state;
}

export const notificationStore = new Store<NotificationStoreData>(
  { notifications: [] },
  notificationStoreReducer,
);

storeManager.addStore(notificationStore);
