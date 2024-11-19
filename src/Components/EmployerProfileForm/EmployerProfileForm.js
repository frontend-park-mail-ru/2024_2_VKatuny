import { Component } from '@/modules/Components/Component';
import { EmployerProfileFormView } from './EmployerProfileFormView';
import { EmployerProfileFormModel } from './EmployerProfileFormModel';
import { EmployerProfileFormController } from './EmployerProfileFormController';
import { LiteralInput } from '@/Components/FormInputs/LiteralInput/LiteralInput';
import { CityInput } from '@/Components/FormInputs/CityInput/CityInput';
import { ValidatedTextArea } from '@/Components/FormInputs/ValidatedTextArea/ValidatedTextArea';

export class EmployerProfileForm extends Component {
  constructor({ userId, elementClass, existingElement }) {
    super({
      modelClass: EmployerProfileFormModel,
      viewClass: EmployerProfileFormView,
      controllerClass: EmployerProfileFormController,
      modelParams: { userId },
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

    this.reset();
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

  reset() {
    return this._controller.reset();
  }

  submit() {
    return this._controller.submit();
  }
}
