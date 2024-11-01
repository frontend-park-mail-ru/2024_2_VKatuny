import { Component } from '../../modules/Components/Component.js';
import { ApplicantProfileFormView } from './ApplicantProfileFormView.js';
import { ApplicantProfileFormModel } from './ApplicantProfileFormModel.js';
import { ApplicantProfileFormController } from './ApplicantProfileFormController.js';
import { LiteralInput } from '/src/Components/FormInputs/LiteralInput/LiteralInput.js';
import { DateInput } from '/src/Components/FormInputs/DateInput/DateInput.js';
import { CityInput } from '/src/Components/FormInputs/CityInput/CityInput.js';
import { ValidatedTextArea } from '../FormInputs/ValidatedTextArea/ValidatedTextArea.js';

export class ApplicantProfileForm extends Component {
  constructor({ userId, elementClass, existingElement }) {
    super({
      modelClass: ApplicantProfileFormModel,
      modelParams: { userId },
      viewClass: ApplicantProfileFormView,
      controllerClass: ApplicantProfileFormController,
      existingElement,
      viewParams: elementClass,
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
      existingElement: this._view.cityField,
      selfValidate: true,
    });
    this._educationField = new ValidatedTextArea({
      existingElement: this._view.educationField,
      selfValidate: true,
    });
    this._contactsField = new ValidatedTextArea({
      existingElement: this._view.contactsField,
      selfValidate: true,
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

  enable() {
    [
      this._firstNameField,
      this._secondNameField,
      this._birthDateField,
      this._cityField,
      this._educationField,
      this._contactsField,
    ].forEach((field) => {
      field.controller.enable();
    });
  }

  disable() {
    [
      this._firstNameField,
      this._secondNameField,
      this._birthDateField,
      this._cityField,
      this._educationField,
      this._contactsField,
    ].forEach((field) => {
      field.controller.disable();
    });
  }

  reset() {}

  submit() {
    this._controller.submit();
  }

  get view() {
    return this._view;
  }
}
