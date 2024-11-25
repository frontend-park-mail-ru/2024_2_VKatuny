import { Component } from '@/modules/Components/Component';
import { EmailInputController } from './EmailInputController';
import { EmailInputView } from './EmailInputView';
import { EmailInputModel } from './EmailInputModel';

export class EmailInput extends Component {
  constructor({ existingElement, selfValidate = false }) {
    super({
      modelClass: EmailInputModel,
      viewClass: EmailInputView,
      existingElement,
      controllerClass: EmailInputController,
      controllerParams: { selfValidate },
    });
  }
}
