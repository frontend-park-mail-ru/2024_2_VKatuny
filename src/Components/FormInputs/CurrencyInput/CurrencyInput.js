import { Component } from '@/modules/Components/Component';
import { ValidatedInputController } from '@/Components/FormInputs/ValidatedInput/ValidatedInputController';
import { ValidatedInputView } from '@/Components/FormInputs/ValidatedInput/ValidatedInputView';
import { CurrencyInputModel } from './CurrencyInputModel';

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
