import { Component } from '@/modules/Components/Component';
import { ValidatedInputController } from '@/Components/FormInputs/ValidatedInput/ValidatedInputController';
import { ValidatedInputView } from '@/Components/FormInputs/ValidatedInput/ValidatedInputView';
import { ValidatedInputModel } from '@/Components/FormInputs/ValidatedInput/ValidatedInputModel';

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
