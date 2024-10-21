import { ComponentView } from '../../modules/Components/Component.js';
import { USER_WANTS_LOGIN } from '../../modules/Events/Events.js';
import { addEventListeners } from '../../modules/Events/EventUtils.js';
import eventBus from '/src/modules/Events/EventBus.js';

export class LoginFormView extends ComponentView {
  #emailField;
  #error;
  #passField;
  #userTypeRadioGroup;
  constructor({ elementClass }, existingElement) {
    super({
      renderParams: { elementClass },
      existingElement,
      templateName: 'login-form.hbs',
    });
    this._eventListeners.push({
      event: 'submit',
      object: this._html,
      listener: function (ev) {
        ev.preventDefault();
        eventBus.emit(USER_WANTS_LOGIN, this.getData());
      }.bind(this),
    });
    addEventListeners(this._eventListeners);
    this.#userTypeRadioGroup = this._html.querySelector('.login-form__user-type-radiogroup');
    this.#emailField = this._html.querySelector('.login-form__email');
    this.#passField = this._html.querySelector('.login-form__password');
    this.#error = this._html.querySelector('.login-form__error');
  }

  get userTypeRadioGroup() {
    return this.#userTypeRadioGroup;
  }

  get emailField() {
    return this.#emailField;
  }

  get passField() {
    return this.#passField;
  }

  hideError() {
    this.#error.hidden = true;
  }

  declineValidation(errorMessage) {
    this.#error.innerText = errorMessage;
    this.#error.hidden = false;
  }

  getData() {
    const formData = new FormData(this._html);
    const dataObj = {};
    formData.entries().forEach((entry) => {
      dataObj[entry[0]] = entry[1];
    });
    return dataObj;
  }
}
