import { ComponentView } from '@/modules/Components/Component';
import SelectInputHbs from './select-input.hbs';
import eventBus from '@/modules/Events/EventBus';
import { SELECT_INPUT_CHANGE } from '@/modules/Events/Events';
import { addEventListeners } from '@/modules/Events/EventUtils';

export class SelectInputView extends ComponentView {
  #select;
  constructor({ name, elementClass, caption }, existingElement) {
    super({
      renderParams: { name, elementClass, caption },
      template: SelectInputHbs,
      existingElement,
    });
    this.#select = this._html.querySelector('.select-input__select');
    this._eventListeners.push({
      event: 'input',
      object: this.#select,
      listener: this.handleSelect,
    })
    addEventListeners(this._eventListeners);
  }

  handleSelect = (ev) => {
    ev.preventDefault();
    eventBus.emit(SELECT_INPUT_CHANGE, { caller: this, value: this.#select.value });
  }

  addOption({ value, caption }) {
    const option = document.createElement('option');
    option.value = value;
    option.innerText = caption;
    this.#select.appendChild(option);
  }
}
