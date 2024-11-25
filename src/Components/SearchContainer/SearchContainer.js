import { Component } from '@/modules/Components/Component';
import { SearchContainerModel } from './SearchContainerModel';
import { SearchContainerView } from './SearchContainerView';
import { SearchContainerController } from './SearchContainerController';
import { SearchBar } from '../SearchBar/SearchBar';
import { SelectInput } from '../FormInputs/SelectInput/SelectInput';
import './search-container.scss';

export class SearchContainer extends Component {
  constructor({ elementClass, existingElement, searchByOptions, searchGroupOptions }) {
    super({
      modelClass: SearchContainerModel,
      viewClass: SearchContainerView,
      controllerClass: SearchContainerController,
      viewParams: { elementClass },
      existingElement,
    });
    this._searchBar = new SearchBar({ elementClass: 'search-container__search-bar' });
    this._view.renderSearchBar(this._searchBar.render());
    this._children.push(this._searchBar);
    if (searchByOptions) {
      this._searchBy = new SelectInput(searchByOptions);
      this._view.renderSearchBy(this._searchBy.render());
      this._children.push(this._searchBy);
    }
    if (searchGroupOptions) {
      this._searchGroup = new SelectInput(searchGroupOptions);
      this._view.renderSearchGroup(this._searchGroup.render());
      this._children.push(this._searchGroup);
    }
  }
}
