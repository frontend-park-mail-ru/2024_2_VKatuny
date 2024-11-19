import { Component, ComponentController, ComponentModel } from '@/modules/Components/Component';
import { MinicardView } from './MinicardView';

export class Minicard extends Component {
  constructor({ renderParams, existingElement }) {
    super({
      modelClass: ComponentModel,
      viewClass: MinicardView,
      controllerClass: ComponentController,
      viewParams: renderParams,
      existingElement,
    });
  }
}
