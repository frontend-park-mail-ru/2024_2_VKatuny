import { Component } from './Component.js';

export class AlertWindow extends Component {
  constructor({ elementClass, text, buttonUrl, buttonText }, existingElement = null) {
    super({
      templateName: 'alert-window.hbs',
      renderParams: { elementClass, text, buttonUrl, buttonText },
      existingElement,
    });
  }
}
