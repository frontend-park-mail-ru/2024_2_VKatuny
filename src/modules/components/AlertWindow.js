import { Component } from './Component.js';

export class AlertWindow extends Component {
  constructor({ elementClass, text, buttonUrl, buttonText }) {
    super({
        elementClass: elementClass,
        text: text,
        buttonUrl: buttonUrl,
        buttonText: buttonText
    });
  }

  renderStatic({elementClass, text, buttonUrl, buttonText}) {
    return Handlebars.templates['alert-window.hbs']({
      elementClass: elementClass,
      text: text,
      buttonUrl: buttonUrl,
      buttonText: buttonText,
    });
  }
}
