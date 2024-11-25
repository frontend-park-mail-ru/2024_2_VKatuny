import { Component } from '@/modules/Components/Component';
import { PasswordInputController } from './PasswordInputController';
import { PasswordInputView } from './PasswordInputView';
import { PasswordInputModel } from './PasswordInputModel';

export class PasswordInput extends Component {
  constructor({ existingElement, selfValidate = false }) {
    super({
      modelClass: PasswordInputModel,
      viewClass: PasswordInputView,
      existingElement,
      controllerClass: PasswordInputController,
      controllerParams: { selfValidate },
    });
  }
}
