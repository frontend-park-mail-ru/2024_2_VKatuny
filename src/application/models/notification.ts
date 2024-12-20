export enum NotificationStyle {
  Ok = 'notification_ok',
  Error = 'notification_error',
}

export interface Notification {
  style: NotificationStyle;
  text: string;
  timeoutMs: number;
}
