import { Component } from '@/modules/Components/Component';
import { CityInputController } from './CityInputController';
import { CityInputView } from './CityInputView';
import { CityInputModel } from './CityInputModel';

export class CityInput extends Component {
  constructor({ existingElement, selfValidate = false }) {
    super({
      modelClass: CityInputModel,
      viewClass: CityInputView,
      existingElement,
      controllerClass: CityInputController,
      controllerParams: { selfValidate },
    });
  }
}
