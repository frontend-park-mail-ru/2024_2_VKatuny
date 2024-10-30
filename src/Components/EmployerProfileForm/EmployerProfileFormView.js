import { ComponentView } from '../../modules/Components/Component.js';
import { UPDATE_PROFILE } from '../../modules/Events/Events.js';
import { addEventListeners } from '../../modules/Events/EventUtils.js';
import { getFormData } from '../../modules/FormUtils/FormUtils.js';
import eventBus from '/src/modules/Events/EventBus.js';

export class EmployerProfileFormView extends ComponentView {
  constructor({ elementClass }, existingElement) {
    super({
      renderParams: { elementClass },
      existingElement,
      templateName: 'employer-profile-form.hbs',
    });
    this._eventListeners.push({
      event: 'submit',
      object: this._html,
      listener: function (ev) {
        ev.preventDefault();
        eventBus.emit(UPDATE_PROFILE, { userType: 'employer', formData: this.getData() });
      }.bind(this),
    });
    addEventListeners(this._eventListeners);
    this.firstNameField = this._html.querySelector('.employer-profile-form__first-name');
    this.secondNameField = this._html.querySelector('.employer-profile-form__second-name');
    this.cityField = this._html.querySelector('.employer-profile-form__city');
    this.contactsField = this._html.querySelector('.employer-profile-form__contacts');
  }

  getData() {
    return getFormData(this._html);
  }
}
