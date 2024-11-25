import { ComponentModel } from '@/modules/Components/Component';

export class SearchContainerModel extends ComponentModel {
  #searchBy;
  #searchGroup;
  #searchQuery;
  constructor() {
    super();
    this.#searchBy = '';
    this.#searchGroup = '';
    this.#searchQuery = '';
  }

  set searchBy(value) {
    this.#searchBy = value;
  }

  set searchGroup(value) {
    this.#searchGroup = value;
  }

  set searchQuery(value) {
    this.#searchQuery = value;
  }

  getFullQuery() {
    return {
      searchQuery: this.#searchQuery,
      searchBy: this.#searchBy,
      searchGroup: this.#searchGroup,
    };
  }
}
