import { Component } from '../../../modules/Components/Component.js';
import { ValidatedInputController } from '../ValidatedInput/ValidatedInputController.js';
import { ValidatedInputView } from '../ValidatedInput/ValidatedInputView.js';
import { CurrencyInputModel } from './CurrencyInputModel.js';

export class CurrencyInput extends Component {
  constructor({ existingElement, selfValidate = false }) {
    super({
      modelClass: CurrencyInputModel,
      controllerClass: ValidatedInputController,
      viewClass: ValidatedInputView,
      existingElement,
      controllerParams: { selfValidate },
    });
  }
}
