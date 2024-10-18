import { Component } from './Component.js';
import { UserTypeRadiogroup } from './FormInputs/UserTypeRadiogroup.js';
import { ValidatedInput } from './FormInputs/ValidatedInput.js';
import { addEventListeners } from '../Events/EventUtils.js';
import eventBus from '/src/modules/Events/EventBus.js';
import { USER_WANTS_LOGIN } from '../Events/Events.js';

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
      object: this._html,
      listener: function (ev) {
        ev.preventDefault();
        eventBus.emit(USER_WANTS_LOGIN, this.getData());
      }.bind(this),
    });
    addEventListeners(this._eventListeners);
  }

  getData() {
    const formData = new FormData(this._html);
    const dataObj = {};
    formData.entries().forEach((entry) => {
      dataObj[entry[0]] = entry[1];
    });
    return dataObj;
  }

  cleanup() {
    this._userTypeRadiogroup.cleanup();
    this._emailField.cleanup();
    this._passField.cleanup();
    super.cleanup();
  }
}
