import state from '@/modules/AppState/AppState';
import { ComponentModel } from '@/modules/Components/Component';
import USER_TYPE from '@/modules/UserSession/UserType';
import { USER_ALREADY_EXISTS_ERROR } from '@/modules/Api/Errors';
import { TransportError, ResponseError } from '@/modules/Api/Api';

export class ApplicantRegistrationFormModel extends ComponentModel {
  validate(formData) {
    const hasEmptyFields = Object.values(formData).some((fieldValue) => {
      return !fieldValue.trim();
    });
    if (hasEmptyFields) {
      return 'Заполните пустые поля';
    }
    const passwordsMatch = formData.password.trim() === formData.repeatPassword.trim();
    if (!passwordsMatch) {
      return 'Введенные пароли не совпадают';
    }
    return '';
  }

  async register(formData) {
    return state.userSession.register(USER_TYPE.APPLICANT, formData).catch((err) => {
      if (err.message === USER_ALREADY_EXISTS_ERROR) {
        return Promise.reject('Соискатель с таким адресом электронной почты уже зарегистрирован');
      }
      if (err instanceof TransportError) {
        return Promise.reject('Произошла сетевая ошибка, повторите позднее');
      }
      if (err instanceof ResponseError)
        return Promise.reject('Произошла непредвиденная ошибка, повторите позднее');
    });
  }
}
