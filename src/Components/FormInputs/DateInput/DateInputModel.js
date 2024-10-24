import { ValidatedInputModel } from '/src/Components/FormInputs/ValidatedInput/ValidatedInputModel.js';

export class DateInputModel extends ValidatedInputModel {
  validate(date) {
    try {
      const parsed = new Date(date);
      if (isNaN(parsed)) {
        throw new Error('Wrong Date format');
      }
    } catch {
      return 'Указана некорректная дата';
    }
  }
}
