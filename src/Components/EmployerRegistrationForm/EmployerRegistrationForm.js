import { Component } from '@/modules/Components/Component';
import { LiteralInput } from '@/Components/FormInputs/LiteralInput/LiteralInput';
import { EmailInput } from '@/Components/FormInputs/EmailInput/EmailInput';
import { TextInput } from '@/Components/FormInputs/TextInput/TextInput';
import { ValidatedTextArea } from '@/Components/FormInputs/ValidatedTextArea/ValidatedTextArea';
import { PasswordInput } from '@/Components/FormInputs/PasswordInput/PasswordInput';
import { EmployerRegistrationFormModel } from './EmployerRegistrationFormModel';
import { EmployerRegistrationFormController } from './EmployerRegistrationFormController';
import { EmployerRegistrationFormView } from './EmployerRegistrationFormView';

export class EmployerRegistrationForm extends Component {
  constructor({ viewParams, existingElement }) {
    super({
      modelClass: EmployerRegistrationFormModel,
      viewClass: EmployerRegistrationFormView,
      controllerClass: EmployerRegistrationFormController,
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
    this._positionField = new TextInput({
      existingElement: this._view.positionField,
      selfValidate: true,
    });
    this._companyNameField = new TextInput({
      existingElement: this._view.companyNameField,
      selfValidate: true,
    });
    this._companyDescriptionField = new ValidatedTextArea({
      existingElement: this._view.companyDescriptionField,
      selfValidate: true,
    });
    this._websiteField = new TextInput({
      existingElement: this._view.websiteField,
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
      selfValidate: true,
    });
    this._children.push(
      this._firstNameField,
      this._secondNameField,
      this._positionField,
      this._companyNameField,
      this._companyDescriptionField,
      this._websiteField,
      this._emailField,
      this._passwordField,
      this._repeatPasswordField,
    );
  }
}
