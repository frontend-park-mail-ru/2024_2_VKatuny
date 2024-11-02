import {
  Component,
  ComponentController,
  ComponentModel,
} from '../../modules/Components/Component.js';
import { MinicardView } from './MinicardView.js';

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
