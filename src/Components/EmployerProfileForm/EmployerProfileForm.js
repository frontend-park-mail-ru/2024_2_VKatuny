import { Component } from '../../modules/Components/Component.js';
import { EmployerProfileFormView } from './EmployerProfileFormView.js';
import { EmployerProfileFormModel } from './EmployerProfileFormModel.js';
import { EmployerProfileFormController } from './EmployerProfileFormController.js';
import { LiteralInput } from '/src/Components/FormInputs/LiteralInput/LiteralInput.js';
import { CityInput } from '/src/Components/FormInputs/CityInput/CityInput.js';
import { ValidatedTextArea } from '../FormInputs/ValidatedTextArea/ValidatedTextArea.js';

export class EmployerProfileForm extends Component {
  constructor({ elementClass, existingElement }) {
    super({
      modelClass: EmployerProfileFormModel,
      viewClass: EmployerProfileFormView,
      controllerClass: EmployerProfileFormController,
      existingElement,
      viewParams: { elementClass },
    });
    this._firstNameField = new LiteralInput({
      existingElement: this._view.firstNameField,
      selfValidate: true,
    });
    this._secondNameField = new LiteralInput({
      existingElement: this._view.secondNameField,
      selfValidate: true,
    });
    this._cityField = new CityInput({
      existingElement: this._view.cityField,
      selfValidate: true,
    });
    this._contactsField = new ValidatedTextArea({
      existingElement: this._view.contactsField,
      selfValidate: true,
    });
    this._children.push(
      this._firstNameField,
      this._secondNameField,
      this._cityField,
      this._contactsField,
    );
  }

  get view() {
    return this._view;
  }

  enable() {
    [this._firstNameField, this._secondNameField, this._cityField, this._contactsField].forEach(
      (field) => {
        field.controller.enable();
      },
    );
  }

  disable() {
    [this._firstNameField, this._secondNameField, this._cityField, this._contactsField].forEach(
      (field) => {
        field.controller.disable();
      },
    );
  }
}
