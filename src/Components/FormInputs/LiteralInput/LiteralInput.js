import { Component } from '../../../modules/Components/Component.js';
import { ValidatedInputController } from '../ValidatedInput/ValidatedInputController.js';
import { ValidatedInputView } from '../ValidatedInput/ValidatedInputView.js';
import { LiteralInputModel } from './LiteralInputModel.js';

export class LiteralInput extends Component {
  constructor({ existingElement, selfValidate = false }) {
    super({
      modelClass: LiteralInputModel,
      viewClass: ValidatedInputView,
      existingElement,
      controllerClass: ValidatedInputController,
      controllerParams: { selfValidate },
    });
  }
}
