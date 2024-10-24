import { Component } from '../../modules/Components/Component.js';
import { HeaderController } from './HeaderController.js';
import { HeaderModel } from './HeaderModel.js';
import { HeaderView } from './HeaderView.js';

export class Header extends Component {
  constructor(renderParams, existingElement) {
    super({
      modelClass: HeaderModel,
      controllerClass: HeaderController,
      viewClass: HeaderView,
      existingElement,
      viewParams: renderParams,
    });
  }
}