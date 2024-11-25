import { Component } from '@/modules/Components/Component';
import { HeaderController } from './HeaderController';
import { HeaderModel } from './HeaderModel';
import { HeaderView } from './HeaderView';

export class Header extends Component {
  constructor({ viewParams, existingElement }) {
    super({
      modelClass: HeaderModel,
      controllerClass: HeaderController,
      viewClass: HeaderView,
      viewParams,
      existingElement,
    });
  }

  static getViewParams() {
    return HeaderView.getViewParams();
  }
}
