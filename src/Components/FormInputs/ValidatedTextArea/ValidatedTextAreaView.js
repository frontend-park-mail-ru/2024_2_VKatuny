import { ComponentView } from '/src/modules/Components/Component.js';
import { addEventListeners } from '/src/modules/Events/EventUtils.js';
import eventBus from '/src/modules/Events/EventBus.js';
import { VALIDATE_INPUT } from '/src/modules/Events/Events.js';

export class ValidatedTextAreaView extends ComponentView {
  #field;
  #state;
  #error;

  OK_CLASS = 'validated-input__input_ok';
  ERROR_CLASS = 'validated-input__input_error';
  NEUTRAL_CLASS = '';

  constructor({ elementClass, inputCaption, inputName }, existingElement) {
    super({
      templateName: 'validated-textarea.hbs',
      renderParams: { elementClass, inputCaption, inputName },
      existingElement,
    });
    this.#field = this._html.querySelector('.validated-textarea__textarea');
    this.#state = this.NEUTRAL_CLASS;
    this.#error = this._html.querySelector('.validated-textarea__error');

    this._eventListeners.push({
      object: this.#field,
      event: 'focusout',
      listener: function () {
        eventBus.emit(VALIDATE_INPUT, { callerView: this });
      }.bind(this),
    });
    addEventListeners(this._eventListeners);
  }

  getData() {
    return this.#field.value;
  }

  switchState(newState) {
    if (this.#state) {
      this.#field.classList.remove(this.#state);
    }
    this.#state = newState;
    this.#field.classList.add(newState);
  }

  approveValidation() {
    this.switchState(this.OK_CLASS);
    this.#error.hidden = true;
  }

  declineValidation(errorMessage) {
    this.switchState(this.ERROR_CLASS);
    this.#error.innerText = errorMessage;
    this.#error.hidden = false;
  }
}
