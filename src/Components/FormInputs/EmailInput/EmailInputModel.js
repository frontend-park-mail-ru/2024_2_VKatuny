import { ValidatedInputModel } from '@/Components/FormInputs/ValidatedInput/ValidatedInputModel';

export class EmailInputModel extends ValidatedInputModel {
  validate(email) {
    email = email.trim();
    const matches = email.match(/^(".*"|[^@]*)@[^@]*$/);
    return matches ? '' : 'Введен некорректный адрес';
  }
}
