import { ComponentView } from '../../modules/Components/Component.js';
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
