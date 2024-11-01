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
  DISABLED_CLASS = 'validated-textarea__textarea_disabled';

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
    if (newState) {
      this.#field.classList.add(newState);
    }
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

  resetValidation() {
    this.switchState(this.NEUTRAL_CLASS);
    this.#error.hidden = true;
  }

  disable() {
    this.switchState(this.DISABLED_CLASS);
    this.#field.disabled = true;
  }

  enable() {
    this.resetValidation();
    this.#field.disabled = false;
  }
}
