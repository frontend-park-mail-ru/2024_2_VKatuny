import { Component } from '@/modules/Components/Component';
import { SearchBarModel } from './SearchBarModel';
import { SearchBarController } from './SearchBarController';
import { SearchBarView } from './SearchBarView';
import './search_bar.scss';

export class SearchBar extends Component {
  constructor({ elementClass = '', existingElement = undefined } = {}) {
    super({
      modelClass: SearchBarModel,
      controllerClass: SearchBarController,
      viewClass: SearchBarView,
      existingElement,
      viewParams: { elementClass },
    });
  }
}
