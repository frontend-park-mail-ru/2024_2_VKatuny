import { Component } from '@/modules/Components/Component';
import { ValidatedInputController } from '@/Components/FormInputs/ValidatedInput/ValidatedInputController';
import { ValidatedInputView } from '@/Components/FormInputs/ValidatedInput/ValidatedInputView';
import { DateInputModel } from './DateInputModel';

export class DateInput extends Component {
  constructor({ existingElement, selfValidate = false }) {
    super({
      modelClass: DateInputModel,
      controllerClass: ValidatedInputController,
      viewClass: ValidatedInputView,
      existingElement,
      controllerParams: { selfValidate },
    });
  }
}
