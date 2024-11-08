import { Component } from '../../modules/Components/Component.js';
import { EmailInput } from '../FormInputs/EmailInput/EmailInput.js';
import { UserTypeRadiogroup } from '../FormInputs/UserTypeRadiogroup/UserTypeRadiogroup.js';
import { PasswordInput } from '../FormInputs/PasswordInput/PasswordInput.js';
import { LoginFormController } from './LoginFormController.js';
import { LoginFormModel } from './LoginFormModel.js';
import { LoginFormView } from './LoginFormView.js';

export class LoginForm extends Component {
  constructor({ viewParams, existingElement }) {
    super({
      modelClass: LoginFormModel,
      viewClass: LoginFormView,
      existingElement,
      viewParams,
      controllerClass: LoginFormController,
    });
    this._emailInput = new EmailInput({ existingElement: this._view.emailField });
    this._passInput = new PasswordInput({ existingElement: this._view.passField });
    this._userTypeRadioGroup = new UserTypeRadiogroup({
      existingElement: this._view.userTypeRadioGroup,
    });
    this._children.push(this._emailInput, this._passInput, this._userTypeRadioGroup);
  }

  get emailInput() {
    return this._emailInput;
  }

  get passInput() {
    return this._passInput;
  }

  get userTypeRadioGroup() {
    return this._userTypeRadioGroup;
  }
}
