import { Component } from '../../../modules/Components/Component.js';
import { CityInputController } from './CityInputController.js';
import { CityInputView } from './CityInputView.js';
import { CityInputModel } from './CityInputModel.js';

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
