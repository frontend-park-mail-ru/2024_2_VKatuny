import { Component } from '../../modules/Components/Component.js';
import { EmailInput } from '../FormInputs/EmailInput/EmailInput.js';
import { UserTypeRadiogroup } from '../FormInputs/UserTypeRadiogroup/UserTypeRadiogroup.js';
import { PasswordInput } from '../FormInputs/PasswordInput/PasswordInput.js';
import { LoginFormController } from './LoginFormController.js';
import { LoginFormModel } from './LoginFormModel.js';
import { LoginFormView } from './LoginFormView.js';

export class LoginForm extends Component {
  #emailInput;
  #passInput;
  #userTypeRadioGroup;
  constructor(viewParams, existingElement) {
    super({
      modelClass: LoginFormModel,
      viewClass: LoginFormView,
      existingElement,
      viewParams,
      controllerClass: LoginFormController,
    });
    this.#emailInput = new EmailInput(this._view.emailField);
    this.#passInput = new PasswordInput(this._view.passField);
    this.#userTypeRadioGroup = new UserTypeRadiogroup({}, this._view.userTypeRadioGroup);
    this._children.push(this.#emailInput, this.#passInput, this.#userTypeRadioGroup);
  }

  get emailInput() {
    return this.#emailInput;
  }

  get passInput() {
    return this.#passInput;
  }

  get userTypeRadioGroup() {
    return this.#userTypeRadioGroup;
  }
}
