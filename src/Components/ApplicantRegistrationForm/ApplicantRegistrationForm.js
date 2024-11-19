import { Component } from '@/modules/Components/Component';
import { LiteralInput } from '@/Components/FormInputs/LiteralInput/LiteralInput';
import { ApplicantRegistrationFormController } from './ApplicantRegistrationFormController';
import { ApplicantRegistrationFormModel } from './ApplicantRegistrationFormModel';
import { ApplicantRegistrationFormView } from './ApplicantRegistrationFormView';
import { EmailInput } from '@/Components/FormInputs/EmailInput/EmailInput';
import { DateInput } from '@/Components/FormInputs/DateInput/DateInput';
import { PasswordInput } from '@/Components/FormInputs/PasswordInput/PasswordInput';

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
