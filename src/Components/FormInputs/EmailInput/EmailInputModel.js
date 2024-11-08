import { ValidatedInputModel } from '/src/Components/FormInputs/ValidatedInput/ValidatedInputModel.js';

export class EmailInputModel extends ValidatedInputModel {
  validate(email) {
    email = email.trim();
    const matches = email.match(/^(".*"|[^@]*)@[^@]*$/);
    return matches ? '' : 'Введен некорректный адрес';
  }
}
