import { Component } from '../../modules/Components/Component.js';
import { EmployerProfileFormView } from './EmployerProfileFormView.js';
import { EmployerProfileFormModel } from './EmployerProfileFormModel.js';
import { EmployerProfileFormController } from './EmployerProfileFormController.js';
import { LiteralInput } from '/src/Components/FormInputs/LiteralInput/LiteralInput.js';
import { TextInput } from '/src/Components/FormInputs/TextInput/TextInput.js';
import { CityInput } from '/src/Components/FormInputs/CityInput/CityInput.js';

export class ApplicantProfileForm extends Component {
  constructor({ viewParams, existingElement }) {
    super({
      modelClass: EmployerProfileFormModel,
      viewClass: EmployerProfileFormView,
      controllerClass: EmployerProfileFormController,
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
    this._cityField = new CityInput({
      existingElement: this._view.emailField,
      selfValidate: true,
    });
    this._contactsField = new TextInput({
      existingElement: this._view.repeatPasswordField,
      selfValidate: false,
    });
    this._children.push(
      this._firstNameField,
      this._secondNameField,
      this._cityField,
      this._contactsField,
    );
  }
}
