import { ComponentView } from '@/modules/Components/Component';
import AlertWindowHbs from './alert-window.hbs';

export class AlertWindowView extends ComponentView {
  constructor({ text, buttonUrl, buttonText, elementClass }, existingElement) {
    super({
      renderParams: {
        text,
        buttonText,
        buttonUrl,
        elementClass,
      },
      template: AlertWindowHbs,
      existingElement,
    });
  }
}
