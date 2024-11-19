import { NOTIFICATION_TIMEOUT } from '../../Components/NotificationBox/NotificationBox.js';
import eventBus from '../Events/EventBus.js';
import { NOTIFICATION_ERROR } from '../Events/Events.js';
import { ResponseError, TransportError } from './Api.js';

export const catchStandardResponseError = (error) => {
  if (error instanceof ResponseError) {
    eventBus.emit(NOTIFICATION_ERROR, {
      message: 'Произошла непредвиденная ошибка, повторите позднее',
      timeout: NOTIFICATION_TIMEOUT.MEDIUM,
    });
  }
  if (error instanceof TransportError) {
    eventBus.emit(NOTIFICATION_ERROR, {
      message: 'Произошла сетевая ошибка, повторите позднее',
      timeout: NOTIFICATION_TIMEOUT.LONG,
    });
  }
};

export const USER_ALREADY_EXISTS_ERROR = 'unable to create user';
export const WRONG_AUTH_ERROR = 'wrong login or password';
