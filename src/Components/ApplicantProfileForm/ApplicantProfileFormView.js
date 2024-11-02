import { ComponentView } from '../../modules/Components/Component.js';
import { getFormData } from '../../modules/FormUtils/FormUtils.js';

export class ApplicantProfileFormView extends ComponentView {
  constructor({ elementClass }, existingElement) {
    super({
      renderParams: { elementClass },
      existingElement,
      templateName: 'applicant-profile-form.hbs',
    });
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

  renderData({ firstName, secondName, birthDate, city, education, contacts }) {
    this.firstNameField.querySelector('.validated-input__input').value = firstName;
    this.secondNameField.querySelector('.validated-input__input').value = secondName;
    this.birthDateField.querySelector('.validated-input__input').value = birthDate;
    this.cityField.querySelector('.validated-input__input').value = city;
    this.educationField.querySelector('.validated-textarea__textarea').value = education;
    this.contactsField.querySelector('.validated-textarea__textarea').value = contacts;
  }
}
