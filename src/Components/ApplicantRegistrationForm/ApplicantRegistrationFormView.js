import { ComponentView } from '../../modules/Components/Component.js';
import { NOTIFICATION_ERROR } from '../../modules/Events/Events.js';
import { addEventListeners } from '../../modules/Events/EventUtils.js';
import { getFormData } from '../../modules/FormUtils/FormUtils.js';
import eventBus from '/src/modules/Events/EventBus.js';
import { REGISTER_APPLICANT } from '/src/modules/Events/Events.js';
import { NOTIFICATION_TIMEOUT } from '../NotificationBox/NotificationBox.js';

export class ApplicantRegistrationFormView extends ComponentView {
  constructor({ elementClass }, existingElement) {
    super({
      renderParams: { elementClass },
      existingElement,
      templateName: 'applicant-registration-form',
    });
    this._eventListeners.push({
      event: 'submit',
      object: this._html,
      listener: function (ev) {
        ev.preventDefault();
        eventBus.emit(REGISTER_APPLICANT, this.getData());
      }.bind(this),
    });
    addEventListeners(this._eventListeners);
    this.firstNameField = this._html.querySelector('.applicant-registration-form__first-name');
    this.secondNameField = this._html.querySelector('.applicant-registration-form__second-name');
    this.birthDateField = this._html.querySelector('.applicant-registration-form__birthdate');
    this.emailField = this._html.querySelector('.applicant-registration-form__email');
    this.passwordField = this._html.querySelector('.applicant-registration-form__password');
    this.repeatPasswordField = this._html.querySelector(
      '.applicant-registration-form__repeat-password',
    );
  }

  getData() {
    return getFormData(this._html);
  }

  declineValidation(errorMessage) {
    eventBus.emit(NOTIFICATION_ERROR, {
      message: errorMessage,
      timeout: NOTIFICATION_TIMEOUT.MEDIUM,
    });
  }
}
