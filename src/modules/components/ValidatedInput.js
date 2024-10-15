import { Component } from './Component.js';

export class ValidatedInput extends Component {
  #field;
  #state;

  OK_CLASS = 'validated-input_ok';
  ERROR_CLASS = 'validated-input_error';
  NEUTRAL_CLASS = '';

  constructor({ elementClass, inputCaption, inputType }, existingElement) {
    super({
      templateName: 'validated-input.hbs',
      renderParams: { elementClass, inputCaption, inputType },
      existingElement,
    });
    this.#field = this._html.querySelector('validated_input__input');
    this.#state = this.NEUTRAL_CLASS;
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
  }

  declineValidation(errorMessage) {
    this.switchState(this.ERROR_CLASS);
    console.log(errorMessage);
  }
}
