/** @fileoverview This file contains actions for notification store */
import { Notification } from '@/application/models/notification';

export enum NotificationAction {
  Add = 'add notifications',
  Read = 'read notification',
  Clear = 'clear notifications',
}

export interface AddNotificationActionPayload {
  notifications: Notification[];
}

export interface AddNotificationAction {
  type: NotificationAction.Add;
  payload: AddNotificationActionPayload;
}

export interface ReadNotificationActionPayload {
  notification: Notification;
}

export interface ReadNotificationAction {
  type: NotificationAction.Read;
  payload: ReadNotificationActionPayload;
}

export interface ClearNotificationsAction {
  type: NotificationAction.Clear;
}
