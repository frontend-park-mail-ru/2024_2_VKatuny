import { Component } from '../../../modules/Components/Component.js';
import { ValidatedInputController } from '../ValidatedInput/ValidatedInputController.js';
import { ValidatedInputView } from '../ValidatedInput/ValidatedInputView.js';
import { DateInputModel } from './DateInputModel.js';

export class DateInput extends Component {
  constructor(existingElement, { selfValidate = false } = {}) {
    super({
      modelClass: DateInputModel,
      controllerClass: ValidatedInputController,
      viewClass: ValidatedInputView,
      existingElement,
      controllerParams: { selfValidate },
    });
  }
}
