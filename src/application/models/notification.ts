export enum NotificationStyle {
  Ok = 'notification_ok',
  Error = 'notification_error',
}

export enum NotificationTimeouts {
  Short = 1000,
  Medium = 2000,
  Long = 5000,
}

export interface Notification {
  style: NotificationStyle;
  text: string;
  timeoutMs: number;
}
