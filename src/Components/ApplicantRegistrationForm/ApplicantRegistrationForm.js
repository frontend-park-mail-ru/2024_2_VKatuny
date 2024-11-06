import { Component } from '../../modules/Components/Component.js';
import { LiteralInput } from '/src/Components/FormInputs/LiteralInput/LiteralInput.js';
import { ApplicantRegistrationFormController } from './ApplicantRegistrationFormController.js';
import { ApplicantRegistrationFormModel } from './ApplicantRegistrationFormModel.js';
import { ApplicantRegistrationFormView } from './ApplicantRegistrationFormView.js';
import { EmailInput } from '../FormInputs/EmailInput/EmailInput.js';
import { DateInput } from '../FormInputs/DateInput/DateInput.js';
import { PasswordInput } from '../FormInputs/PasswordInput/PasswordInput.js';

export class ApplicantRegistrationForm extends Component {
  constructor({ viewParams, existingElement }) {
    super({
      modelClass: ApplicantRegistrationFormModel,
      viewClass: ApplicantRegistrationFormView,
      controllerClass: ApplicantRegistrationFormController,
      existingElement,
      viewParams,
    });
    this._firstNameField = new LiteralInput({
      existingElement: this._view.firstNameField,
      selfValidate: true,
    });
    this._secondNameField = new LiteralInput({
      existingElement: this._view.secondNameField,
      selfValidate: true,
    });
    this._birthDateField = new DateInput({
      existingElement: this._view.birthDateField,
      selfValidate: true,
    });
    this._emailField = new EmailInput({
      existingElement: this._view.emailField,
      selfValidate: true,
    });
    this._passwordField = new PasswordInput({
      existingElement: this._view.passwordField,
      selfValidate: true,
    });
    this._repeatPasswordField = new PasswordInput({
      existingElement: this._view.repeatPasswordField,
      selfValidate: false,
    });
    this._children.push(
      this._firstNameField,
      this._secondNameField,
      this._birthDateField,
      this._emailField,
      this._passwordField,
      this._repeatPasswordField,
    );
  }
}
