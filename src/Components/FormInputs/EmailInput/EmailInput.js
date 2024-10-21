import { Component } from '../../../modules/Components/Component.js';
import { EmailInputController } from './EmailInputController.js';
import { EmailInputView } from './EmailInputView.js';
import { EmailInputModel } from './EmailInputModel.js';

export class EmailInput extends Component {
  constructor(existingElement) {
    super({
      modelClass: EmailInputModel,
      viewClass: EmailInputView,
      existingElement,
      controllerClass: EmailInputController,
    });
  }
}
