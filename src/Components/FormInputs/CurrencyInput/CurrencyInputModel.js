import { ValidatedInputModel } from '/src/Components/FormInputs/ValidatedInput/ValidatedInputModel.js';

export class CurrencyInputModel extends ValidatedInputModel {
  validate(numberStr) {
    numberStr = numberStr.trim();
    const matches = numberStr.match(/^[0-9]+$/);
    return matches ? '' : 'Тут нужно ввести целое число';
  }
}
