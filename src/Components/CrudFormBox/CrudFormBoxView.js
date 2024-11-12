import { ComponentView } from '../../modules/Components/Component.js';
import { addEventListeners } from '../../modules/Events/EventUtils.js';
import eventBus from '/src/modules/Events/EventBus.js';
import { EDIT_FORM, SUBMIT_FORM, RESET_FORM } from '/src/modules/Events/Events.js';
import CrudFormBoxHbs from './crud-form-box.hbs';

const CRUD_FORM_STATE = {
  READ: 'read',
  EDIT: 'edit',
};

export class CrudFormBoxView extends ComponentView {
  #buttonContainer;
  #submitButton;
  #resetButton;
  #editButton;
  #canUpdate;
  #formView;
  #state = CRUD_FORM_STATE.READ;
  constructor({ formView, canUpdate, elementClass }) {
    super({
      renderParams: { canUpdate, elementClass },
      template: CrudFormBoxHbs,
    });
    this.#canUpdate = canUpdate;
    this.#formView = formView;

    if (this.#canUpdate) {
      this.#buttonContainer = this._html.querySelector('.crud-form-box__button-container');
      this.#editButton = this._html.querySelector('.crud-form-box__edit-button');
      this.#submitButton = this._html.querySelector('.crud-form-box__form-submit-button');
      this.#resetButton = this._html.querySelector('.crud-form-box__form-reset-button');
      this._html.insertBefore(formView.render(), this.#buttonContainer);
      this.#submitButton.setAttribute('form', this.#formView.getId());
      this.#resetButton.setAttribute('form', this.#formView.getId());
      this._eventListeners.push({
        event: 'click',
        object: this.#editButton,
        listener: function () {
          eventBus.emit(EDIT_FORM, { caller: this.#formView });
        }.bind(this),
      });
    } else {
      this._html.appendChild(formView.render());
    }
    this._eventListeners.push(
      {
        event: 'submit',
        object: this.#formView.render(),
        listener: function (ev) {
          ev.preventDefault();
          eventBus.emit(SUBMIT_FORM, { caller: this.#formView });
        }.bind(this),
      },

      {
        event: 'reset',
        object: this.#formView.render(),
        listener: function (ev) {
          ev.preventDefault();
          eventBus.emit(RESET_FORM, { caller: this.#formView });
        }.bind(this),
      },
    );
    addEventListeners(this._eventListeners);

    this.readState();
  }

  get formView() {
    return this.#formView;
  }

  readState() {
    if (this.#state === CRUD_FORM_STATE.READ) {
      return;
    }
    if (this.#canUpdate) {
      this.#editButton.hidden = false;
    }
    this.#submitButton.hidden = true;
    this.#resetButton.hidden = true;
    this.#state = CRUD_FORM_STATE.READ;
  }

  editState() {
    if (this.#state === CRUD_FORM_STATE.EDIT) {
      return;
    }
    if (!this.#canUpdate) {
      return;
    }
    this.#editButton.hidden = true;
    this.#submitButton.hidden = false;
    this.#resetButton.hidden = false;
    this.#state = CRUD_FORM_STATE.EDIT;
  }
}
