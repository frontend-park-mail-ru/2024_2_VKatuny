import { ComponentView } from '../../modules/Components/Component.js';
import { getFormData } from '../../modules/FormUtils/FormUtils.js';

export class EmployerProfileFormView extends ComponentView {
  constructor({ elementClass }, existingElement) {
    super({
      renderParams: { elementClass },
      existingElement,
      templateName: 'employer-profile-form.hbs',
    });
    this.firstNameField = this._html.querySelector('.employer-profile-form__first-name');
    this.secondNameField = this._html.querySelector('.employer-profile-form__second-name');
    this.cityField = this._html.querySelector('.employer-profile-form__city');
    this.contactsField = this._html.querySelector('.employer-profile-form__contacts');
  }

  getData() {
    return getFormData(this._html);
  }

  getId() {
    return 'employer-profile-form';
  }

  renderData({ firstName, secondName, city, contacts }) {
    this.firstNameField.querySelector('.validated-input__input').value = firstName;
    this.secondNameField.querySelector('.validated-input__input').value = secondName;
    this.cityField.querySelector('.validated-input__input').value = city;
    this.contactsField.querySelector('.validated-textarea__textarea').value = contacts;
  }
}
