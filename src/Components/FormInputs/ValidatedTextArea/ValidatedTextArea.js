import { ValidatedInputModel } from '@/Components/FormInputs/ValidatedInput/ValidatedInputModel';
import { ValidatedTextAreaView } from './ValidatedTextAreaView';
import { ValidatedInputController } from '@/Components/FormInputs/ValidatedInput/ValidatedInputController';
import { Component } from '@/modules/Components/Component';

export class ValidatedTextArea extends Component {
  constructor({ existingElement, selfValidate }) {
    super({
      modelClass: ValidatedInputModel,
      viewClass: ValidatedTextAreaView,
      controllerClass: ValidatedInputController,
      existingElement,
      controllerParams: { selfValidate },
    });
  }
}
