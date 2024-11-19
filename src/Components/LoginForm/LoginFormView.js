import { ComponentView } from '@/modules/Components/Component';
import { NOTIFICATION_ERROR, USER_WANTS_LOGIN } from '@/modules/Events/Events';
import { addEventListeners } from '@/modules/Events/EventUtils';
import { NOTIFICATION_TIMEOUT } from '@/Components/NotificationBox/NotificationBox';
import eventBus from '@/modules/Events/EventBus';
import LoginFormHbs from './login-form.hbs';

export class LoginFormView extends ComponentView {
  #emailField;
  #passField;
  #userTypeRadioGroup;
  constructor({ elementClass }, existingElement) {
    super({
      renderParams: { elementClass },
      existingElement,
      templateName: LoginFormHbs,
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

  declineValidation(errorMessage) {
    eventBus.emit(NOTIFICATION_ERROR, {
      message: errorMessage,
      timeout: NOTIFICATION_TIMEOUT.MEDIUM,
    });
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
