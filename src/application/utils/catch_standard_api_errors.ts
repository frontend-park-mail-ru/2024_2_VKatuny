import { TransportError, ResponseError } from '@/modules/api/api';
import { notificationActionCreators } from '../action_creators/notification_action_creators';
import { NotificationStyle, NotificationTimeouts } from '../models/notification';
import { CsrfError } from '@/modules/api/src/errors/errors';

export function catch_standard_api_errors(error: Error) {
  if (error instanceof ResponseError) {
    notificationActionCreators.addNotifications({
      text: 'Произошла непредвиденная ошибка, повторите позднее',
      style: NotificationStyle.Error,
      timeoutMs: NotificationTimeouts.Medium,
    });
    return;
  }
  if (error instanceof TransportError) {
    notificationActionCreators.addNotifications({
      text: 'Произошла сетевая ошибка, повторите позднее',
      style: NotificationStyle.Error,
      timeoutMs: NotificationTimeouts.Medium,
    });
    return;
  }
  if (error instanceof CsrfError) {
    notificationActionCreators.addNotifications({
      text: 'Произошла ошибка авторизации, перезайдите в аккаунт',
      style: NotificationStyle.Error,
      timeoutMs: NotificationTimeouts.Medium,
    });
  }
}
