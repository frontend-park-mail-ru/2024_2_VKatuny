import { Component } from '../../../modules/Components/Component.js';
import { ValidatedInputController } from '../ValidatedInput/ValidatedInputController.js';
import { ValidatedInputView } from '../ValidatedInput/ValidatedInputView.js';
import { ValidatedInputModel } from '../ValidatedInput/ValidatedInputModel.js';

export class TextInput extends Component {
  constructor({ existingElement, selfValidate = false }) {
    super({
      modelClass: ValidatedInputModel,
      viewClass: ValidatedInputView,
      existingElement,
      controllerClass: ValidatedInputController,
      controllerParams: { selfValidate },
    });
  }
}
