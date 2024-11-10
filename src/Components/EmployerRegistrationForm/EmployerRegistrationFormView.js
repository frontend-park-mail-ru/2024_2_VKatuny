import { ComponentView } from '../../modules/Components/Component.js';
import { NOTIFICATION_ERROR } from '../../modules/Events/Events.js';
import { addEventListeners } from '../../modules/Events/EventUtils.js';
import { getFormData } from '../../modules/FormUtils/FormUtils.js';
import { NOTIFICATION_TIMEOUT } from '../NotificationBox/NotificationBox.js';
import eventBus from '/src/modules/Events/EventBus.js';
import { REGISTER_EMPLOYER } from '/src/modules/Events/Events.js';
import EmployerRegistrationFormHbs from './employer-registration-form.hbs';

export class EmployerRegistrationFormView extends ComponentView {
  constructor({ elementClass }, existingElement) {
    super({
      renderParams: { elementClass },
      existingElement,
      templateName: EmployerRegistrationFormHbs,
    });
    this._eventListeners.push({
      event: 'submit',
      object: this._html,
      listener: function (ev) {
        ev.preventDefault();
        eventBus.emit(REGISTER_EMPLOYER, this.getData());
      }.bind(this),
    });
    addEventListeners(this._eventListeners);
    this.firstNameField = this._html.querySelector('.employer-registration-form__first-name');
    this.secondNameField = this._html.querySelector('.employer-registration-form__second-name');
    this.positionField = this._html.querySelector('.employer-registration-form__position');
    this.companyNameField = this._html.querySelector('.employer-registration-form__company-name');
    this.companyDescriptionField = this._html.querySelector(
      '.employer-registration-form__company-description',
    );
    this.websiteField = this._html.querySelector('.employer-registration-form__website');
    this.emailField = this._html.querySelector('.employer-registration-form__email');
    this.passwordField = this._html.querySelector('.employer-registration-form__password');
    this.repeatPasswordField = this._html.querySelector(
      '.employer-registration-form__repeat-password',
    );
    this.error = this._html.querySelector('.employer-registration-form__error');
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
