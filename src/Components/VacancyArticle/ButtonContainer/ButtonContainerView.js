import {
  VACANCY_APPLY,
  VACANCY_DELETE,
  VACANCY_EDIT,
  VACANCY_RESET_APPLY,
} from '../../../modules/Events/Events.js';
import { addEventListeners } from '../../../modules/Events/EventUtils.js';
import { ComponentView } from '/src/modules/Components/Component.js';
import eventBus from '/src/modules/Events/EventBus.js';
import ButtonContainerHbs from './vacancy-article__button-container.hbs';

export class ButtonContainerView extends ComponentView {
  #applyButton;
  #editButton;
  #deleteButton;
  #vacancyId;
  #isApplied;
  #resetApplyButton;
  #activeApplyButton;
  constructor({ isOwner, isApplicant, ownerId, vacancyId, isApplied }, existingElement) {
    super({
      renderParams: { isOwner, isApplicant, ownerId },
      existingElement,
      template: ButtonContainerHbs,
    });
    this.#isApplied = isApplied;
    this.#vacancyId = vacancyId;
    if (isApplicant) {
      this.#applyButton = this._html.querySelector('.vacancy-article__apply-button');
      this._eventListeners.push({
        event: 'click',
        object: this.#applyButton,
        listener: function (ev) {
          ev.preventDefault();
          eventBus.emit(VACANCY_APPLY, { caller: this, vacancyId: this.#vacancyId });
        }.bind(this),
      });
      this.#resetApplyButton = this._html.querySelector('.vacancy-article__reset-apply-button');
      this._eventListeners.push({
        event: 'click',
        object: this.#resetApplyButton,
        listener: function (ev) {
          ev.preventDefault();
          eventBus.emit(VACANCY_RESET_APPLY, { caller: this, vacancyId: this.#vacancyId });
        }.bind(this),
      });
      this.#activeApplyButton = this.#isApplied ? this.#resetApplyButton : this.#applyButton;
      this.#activeApplyButton.classList.remove('hidden');
    } else if (isOwner) {
      this.#editButton = this._html.querySelector('.vacancy-article__edit-button');
      this.#deleteButton = this._html.querySelector('.vacancy-article__delete-button');
      this._eventListeners.push(
        {
          event: 'click',
          object: this.#editButton,
          listener: function (ev) {
            ev.preventDefault();
            eventBus.emit(VACANCY_EDIT, { vacancyId: this.#vacancyId });
          }.bind(this),
        },
        {
          event: 'click',
          object: this.#deleteButton,
          listener: function (ev) {
            ev.preventDefault();
            eventBus.emit(VACANCY_DELETE, { vacancyId: this.#vacancyId });
          }.bind(this),
        },
      );
    }
    addEventListeners(this._eventListeners);
  }

  toggleApplyButton() {
    this.#activeApplyButton.classList.add('hidden');
    if (Object.is(this.#activeApplyButton, this.#applyButton)) {
      this.#activeApplyButton = this.#resetApplyButton;
      this.#resetApplyButton.classList.remove('hidden');
    } else {
      this.#activeApplyButton = this.#applyButton;
      this.#applyButton.classList.remove('hidden');
    }
  }
}
