import { Component } from './Component.js';
import { ValidatedInput } from './ValidatedInput.js';

export class LoginForm extends Component {
  constructor(renderParams, existingElement = null) {
    super({ renderParams, existingElement, templateName: 'login-form.hbs' });
    this._emailField = new ValidatedInput({}, this._html.querySelector('.login-form__email'));
    this._passField = new ValidatedInput({}, this._html.querySelector('.login-form__password'));
  }

  getData() {
    return new FormData(this._html);
  }
}
