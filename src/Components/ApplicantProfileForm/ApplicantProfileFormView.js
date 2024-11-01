import { ComponentView } from '../../modules/Components/Component.js';
import { UPDATE_PROFILE } from '../../modules/Events/Events.js';
import { addEventListeners } from '../../modules/Events/EventUtils.js';
import { getFormData } from '../../modules/FormUtils/FormUtils.js';
import eventBus from '/src/modules/Events/EventBus.js';
import USER_TYPE from '../../modules/UserSession/UserType.js';

export class ApplicantProfileFormView extends ComponentView {
  constructor({ elementClass }, existingElement) {
    super({
      renderParams: { elementClass },
      existingElement,
      templateName: 'applicant-profile-form.hbs',
    });
    this._eventListeners.push({
      event: 'submit',
      object: this._html,
      listener: function (ev) {
        ev.preventDefault();
        eventBus.emit(UPDATE_PROFILE, { userType: USER_TYPE.APPLICANT, formData: this.getData() });
      }.bind(this),
    });
    addEventListeners(this._eventListeners);
    this.firstNameField = this._html.querySelector('.applicant-profile-form__first-name');
    this.secondNameField = this._html.querySelector('.applicant-profile-form__second-name');
    this.birthDateField = this._html.querySelector('.applicant-profile-form__birthdate');
    this.cityField = this._html.querySelector('.applicant-profile-form__city');
    this.educationField = this._html.querySelector('.applicant-profile-form__education');
    this.contactsField = this._html.querySelector('.applicant-profile-form__contacts');
  }

  getData() {
    return getFormData(this._html);
  }

  getId() {
    return 'applicant-profile-form';
  }
}
