import {
  Component,
  ComponentController,
  ComponentModel,
} from '../../modules/Components/Component.js';
import { AlertWindowView } from './AlertWindowView.js';

export class AlertWindow extends Component {
  constructor({ text, buttonText, buttonUrl, elementClass }, existingElement) {
    super({
      modelClass: ComponentModel,
      controllerClass: ComponentController,
      viewClass: AlertWindowView,
      viewParams: { text, buttonUrl, buttonText, elementClass },
      existingElement,
    });
  }
}
