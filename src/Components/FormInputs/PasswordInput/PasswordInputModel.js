import { ValidatedInputModel } from '@/Components/FormInputs/ValidatedInput/ValidatedInputModel';

export class PasswordInputModel extends ValidatedInputModel {
  #MIN_PASSWORD_LEN = 8;

  validate(password) {
    if (password.length < this.#MIN_PASSWORD_LEN) {
      return 'Введите пароль длиной хотя бы 8 символов';
    }
    return '';
  }
}
