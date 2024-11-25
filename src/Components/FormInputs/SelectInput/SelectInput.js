import { Component } from '@/modules/Components/Component';
import { SelectInputModel } from './SelectInputModel';
import { SelectInputController } from './SelectInputController';
import { SelectInputView } from './SelectInputView';
import './select-input.scss';
export class SelectInput extends Component {
  constructor({ name, elementClass, caption, options }, existingElement) {
    super({
      modelClass: SelectInputModel,
      controllerClass: SelectInputController,
      viewClass: SelectInputView,
      viewParams: { name, elementClass, caption },
      existingElement,
    });
    this._controller.loadOptions(options);
  }
}
