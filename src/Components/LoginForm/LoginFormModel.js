import { ComponentModel } from '../../modules/Components/Component.js';
import state from '/src/modules/AppState/AppState.js';
import { TransportError, ResponseError } from '../../modules/Api/Api.js';
import { WRONG_AUTH_ERROR } from '@/modules/Api/Errors.js';

export class LoginFormModel extends ComponentModel {
  validate(formData) {
    const hasEmptyFields = Object.values(formData).some((fieldValue) => {
      return !fieldValue.trim();
    });
    if (hasEmptyFields) {
      return 'Заполните пустые поля';
    }
    return '';
  }

  async login(formData) {
    return state.userSession.login(formData).catch((err) => {
      if (err.message === WRONG_AUTH_ERROR) {
        return Promise.reject('Неверная почта или пароль');
      }
      if (err instanceof TransportError) {
        return Promise.reject('Произошла сетевая ошибка, повторите позднее');
      }
      if (err instanceof ResponseError) {
        return Promise.reject('Произошла непредвиденная ошибка, повторите позднее');
      }
      return Promise.reject(err);
    });
  }
}
