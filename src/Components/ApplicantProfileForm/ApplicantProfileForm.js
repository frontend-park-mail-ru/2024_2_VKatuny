import { Component } from '../../modules/Components/Component.js';
import { ApplicantProfileFormView } from './ApplicantProfileFormView.js';
import { ApplicantProfileFormModel } from './ApplicantProfileFormModel.js';
import { ApplicantProfileFormController } from './ApplicantProfileFormController.js';
import { LiteralInput } from '/src/Components/FormInputs/LiteralInput/LiteralInput.js';
import { DateInput } from '/src/Components/FormInputs/DateInput/DateInput.js';
import { TextInput } from '/src/Components/FormInputs/TextInput/TextInput.js';
import { CityInput } from '/src/Components/FormInputs/CityInput/CityInput.js';

export class ApplicantProfileForm extends Component {
  constructor({ viewParams, existingElement }) {
    super({
      modelClass: ApplicantProfileFormModel,
      viewClass: ApplicantProfileFormView,
      controllerClass: ApplicantProfileFormController,
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
    this._cityField = new CityInput({
      existingElement: this._view.emailField,
      selfValidate: true,
    });
    this._educationField = new TextInput({
      existingElement: this._view.passwordField,
      selfValidate: true,
    });
    this._contactsField = new TextInput({
      existingElement: this._view.repeatPasswordField,
      selfValidate: false,
    });
    this._children.push(
      this._firstNameField,
      this._secondNameField,
      this._birthDateField,
      this._cityField,
      this._educationField,
      this._contactsField,
    );
  }
}
