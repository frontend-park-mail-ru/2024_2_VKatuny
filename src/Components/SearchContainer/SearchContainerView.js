import { ComponentView } from '@/modules/Components/Component';
import SearchContainerHbs from './search-container.hbs';

export class SearchContainerView extends ComponentView {
  #searchInput;
  constructor(renderParams, existingElement) {
    super({
      renderParams,
      existingElement,
      template: SearchContainerHbs,
      viewParams: renderParams,
    });
    this.#searchInput = this._html.querySelector('.search-container__input-box');
    this.searchBy = undefined;
    this.searchBar = undefined;
    this.searchGroup = undefined;
  }

  renderSearchBar(searchBarRender) {
    this.#searchInput.appendChild(searchBarRender);
    this.searchBar = searchBarRender;
  }

  renderSearchBy(searchByRender) {
    this.#searchInput.appendChild(searchByRender);
    this.searchBy = searchByRender;
  }

  renderSearchGroup(searchGroupRender) {
    this.#searchInput.appendChild(searchGroupRender);
    this.searchGroup = searchGroupRender;
  }
}
