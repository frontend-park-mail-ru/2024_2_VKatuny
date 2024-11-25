import { Component } from '@/modules/Components/Component';
import { EmailInput } from '@/Components/FormInputs/EmailInput/EmailInput';
import { UserTypeRadiogroup } from '@/Components/FormInputs/UserTypeRadiogroup/UserTypeRadiogroup';
import { PasswordInput } from '@/Components/FormInputs/PasswordInput/PasswordInput';
import { LoginFormController } from './LoginFormController';
import { LoginFormModel } from './LoginFormModel';
import { LoginFormView } from './LoginFormView';

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
