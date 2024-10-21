import { ComponentModel } from '../../../modules/Components/Component.js';

export class LiteralInputModel extends ComponentModel {
  validate(text) {
    if (!text.match(/^[a-zA-zа-яА-я ]*$/)) {
      return 'Здесь нужно вводить только буквы';
    }
    return '';
  }
}
