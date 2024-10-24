import { ComponentView } from '../../modules/Components/Component.js';

export class AlertWindowView extends ComponentView {
  constructor({ text, buttonUrl, buttonText, elementClass }, existingElement) {
    super({
      renderParams: {
        text,
        buttonText,
        buttonUrl,
        elementClass,
      },
      templateName: 'alert-window.hbs',
      existingElement,
    });
  }
}
