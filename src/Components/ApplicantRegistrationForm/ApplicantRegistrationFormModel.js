import state from '../../modules/AppState/AppState.js';
import { ComponentModel } from '../../modules/Components/Component.js';
import USER_TYPE from '../../modules/UserSession/UserType.js';

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
    return state.userSession.register(USER_TYPE.APPLICANT, formData);
  }
}
