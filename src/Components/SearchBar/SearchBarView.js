import { ComponentView } from '@/modules/Components/Component';
import SearchBarHbs from './search-bar.hbs';
import { zip } from '@/modules/ObjectUtils/Zip';
import searchIconSvg from '@static/img/search-icon.svg';
import clearIconSvg from '@static/img/clear-icon.svg';
import { addEventListeners } from '@/modules/Events/EventUtils';
import EventBus from '@/modules/Events/EventBus';
import { SUBMIT_SEARCH } from '@/modules/Events/Events';

export class SearchBarView extends ComponentView {
  #searchInput;
  #clearButton;
  #searchForm;
  #isInputEmpty;
  constructor(renderParams, existingElement) {
    super({
      renderParams: zip(renderParams, {
        searchIcon: searchIconSvg,
        clearIcon: clearIconSvg,
      }),
      existingElement,
      template: SearchBarHbs,
    });

    this.#searchInput = this._html.querySelector('.search-bar__input');
    this.#clearButton = this._html.querySelector('.search-bar__clear-icon');
    this.#searchForm = this._html.querySelector('.search-container__search-bar');
    this.#isInputEmpty = true;

    this._eventListeners.push(
      {
        event: 'submit',
        object: this.#searchForm,
        listener: this.#handleSubmit,
      },
      {
        event: 'click',
        object: this.#clearButton,
        listener: this.#handleClear,
      },
      {
        event: 'input',
        object: this.#searchInput,
        listener: this.#handleInput,
      },
    );
    addEventListeners(this._eventListeners);
  }

  clearSearch() {
    this.#searchInput.value = '';
    this.#isInputEmpty = true;
  }

  toggleClearButton() {
    this.#clearButton.classList.toggle('hidden');
  }

  #handleSubmit = (ev) => {
    ev.preventDefault();
    EventBus.emit(SUBMIT_SEARCH, { searchInput: this.#searchInput.value });
  };

  #handleClear = () => {
    this.clearSearch();
    this.toggleClearButton();
    EventBus.emit(SUBMIT_SEARCH, { searchInput: '' });
  };

  #handleInput = () => {
    if (!this.#isInputEmpty) {
      return;
    }
    this.toggleClearButton();
    this.#isInputEmpty = false;
  };
}
