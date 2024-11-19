import { Component, ComponentController, ComponentModel } from '@/modules/Components/Component';
import { AlertWindowView } from './AlertWindowView';

export class AlertWindow extends Component {
  constructor({ viewParams, existingElement }) {
    super({
      modelClass: ComponentModel,
      controllerClass: ComponentController,
      viewClass: AlertWindowView,
      viewParams,
      existingElement,
    });
  }
}
