import { ComponentModel } from '@/modules/Components/Component';

export class LiteralInputModel extends ComponentModel {
  validate(text) {
    if (!text.match(/^[a-zA-zа-яА-я\- ]*$/)) {
      return 'Здесь нужно вводить только буквы';
    }
    return '';
  }
}
