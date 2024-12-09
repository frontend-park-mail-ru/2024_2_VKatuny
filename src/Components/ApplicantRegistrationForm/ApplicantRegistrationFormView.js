import { ComponentView } from '@/modules/Components/Component';
import { NOTIFICATION_ERROR } from '@/modules/Events/Events';
import { addEventListeners } from '@/modules/Events/EventUtils';
import { getFormData } from '@/modules/FormUtils/FormUtils';
import eventBus from '@/modules/Events/EventBus';
import { REGISTER_APPLICANT } from '@/modules/Events/Events';
import { NOTIFICATION_TIMEOUT } from '@/Components/NotificationBox/NotificationBox';
import ApplicantRegistrationFormHbs from './applicant-registration-form.hbs';

export class ApplicantRegistrationFormView extends ComponentView {
  constructor({ elementClass }, existingElement) {
    super({
      renderParams: { elementClass },
      existingElement,
      template: ApplicantRegistrationFormHbs,
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
