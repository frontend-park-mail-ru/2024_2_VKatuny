import { Component } from '../../../modules/Components/Component.js';
import { PasswordInputController } from './PasswordInputController.js';
import { PasswordInputView } from './PasswordInputView.js';
import { PasswordInputModel } from './PasswordInputModel.js';

export class PasswordInput extends Component {
  constructor(existingElement, { selfValidate = false }) {
    super({
      modelClass: PasswordInputModel,
      viewClass: PasswordInputView,
      existingElement,
      controllerClass: PasswordInputController,
      controllerParams: { selfValidate },
    });
  }
}
