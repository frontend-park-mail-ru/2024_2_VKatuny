import { Component } from '@/modules/Components/Component.js';
import { ValidatedInputController } from '@/Components/FormInputs/ValidatedInput/ValidatedInputController';
import { ValidatedInputView } from '@/Components/FormInputs/ValidatedInput/ValidatedInputView';
import { LiteralInputModel } from './LiteralInputModel';

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
