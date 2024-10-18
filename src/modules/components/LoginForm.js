import { Component } from './Component.js';
import { UserTypeRadiogroup } from './UserTypeRadiogroup.js';
import { ValidatedInput } from './ValidatedInput.js';
import { addEventListeners } from '../Events/EventUtils.js';
import eventBus from '/src/modules/EventBus/EventBus.js';

export class LoginForm extends Component {
  constructor(renderParams, existingElement = null) {
    super({ renderParams, existingElement, templateName: 'login-form.hbs' });
    this._userTypeRadiogroup = new UserTypeRadiogroup(
      {},
      this._html.querySelector('.login-form__user-type-radiogroup'),
    );
    this._emailField = new ValidatedInput({}, this._html.querySelector('.login-form__email'));
    this._passField = new ValidatedInput({}, this._html.querySelector('.login-form__password'));

    this._eventListeners.push({
      event: 'submit',
      object: this.html_,
      listener: function () {
        eventBus.emit('user::login', this.getData());
      }.bind(this),
    });
    addEventListeners(this._eventListeners);
  }

  getData() {
    return new FormData(this._html);
  }

  cleanup() {
    this._userTypeRadiogroup.cleanup();
    this._emailField.cleanup();
    this._passField.cleanup();
    super.cleanup();
  }
}
