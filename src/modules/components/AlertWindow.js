import { Component } from './Component.js';

export class AlertWindow extends Component {
  constructor({ elementClass, text, buttonUrl, buttonText }) {
    super({
      elementClass,
      text,
      buttonUrl,
      buttonText,
    });
  }

  renderStatic(renderParams) {
    return Handlebars.templates['alert-window.hbs'](renderParams);
  }
}
