import { ComponentController } from '@/modules/Components/Component';
import eventBus from '@/modules/Events/EventBus';
import { SEARCH_INPUT_CHANGE, SELECT_INPUT_CHANGE, SUBMIT_SEARCH_QUERY } from '@/modules/Events/Events';

export class SearchContainerController extends ComponentController {
  constructor(model, view, component) {
    super(model, view, component);
    this.setHandlers([
      {
        event: SELECT_INPUT_CHANGE,
        handler: this.handleSelectInputChange.bind(this),
      },
      {
        event: SEARCH_INPUT_CHANGE,
        handler: this.handleSearchInputChange.bind(this),
      },
    ]);
  }

  handleSelectInputChange({ caller, value }) {
    switch (caller.render()) {
      case this._view.searchBy: {
        this._model.searchBy = value;
        eventBus.emit(SUBMIT_SEARCH_QUERY, { query: this._model.getFullQuery() });
        break;
      }
      case this._view.searchGroup: {
        this._model.searchGroup = value;
        eventBus.emit(SUBMIT_SEARCH_QUERY, { query: this._model.getFullQuery() });
        break;
      }
    }
  }

  handleSearchInputChange({ searchInput }) {
    this._model.searchQuery = searchInput;
    eventBus.emit(SUBMIT_SEARCH_QUERY, { query: this._model.getFullQuery() });
  }
}
