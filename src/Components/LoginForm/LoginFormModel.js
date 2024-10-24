import { ComponentModel } from '../../modules/Components/Component.js';
import state from '/src/modules/AppState/AppState.js';

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
    return state.userSession.login(formData);
    // await this._state.userSession
    //   .login({
    //     userType: data.get('user-type'),
    //     login: data.get('email'),
    //     password: data.get('password'),
    //   })
    //   .catch((status) => {
    //     if (status === 401) {
    //       this.error('Неверный email или пароль');
    //       return Promise.resolve();
    //     }
    //     return Promise.reject(status);
    //   })
    //   .catch(() => this.error('Произошла непредвиденная ошибка, повторите позднее'));
  }
}
