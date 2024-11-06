import { VACANCY_APPLY, VACANCY_DELETE, VACANCY_EDIT } from '../../../modules/Events/Events.js';
import { addEventListeners } from '../../../modules/Events/EventUtils.js';
import { ComponentView } from '/src/modules/Components/Component.js';
import eventBus from '/src/modules/Events/EventBus.js';

export class ButtonContainerView extends ComponentView {
  #applyButton;
  #editButton;
  #deleteButton;
  #vacancyId;
  constructor({ isOwner, isApplicant, ownerId, vacancyId }, existingElement) {
    super({
      renderParams: { isOwner, isApplicant, ownerId },
      existingElement,
      templateName: 'vacancy-article__button-container.hbs',
    });
    this.#vacancyId = vacancyId;
    if (isApplicant) {
      this.#applyButton = this._html.querySelector('.vacancy-article__apply-button');
      this._eventListeners.push({
        event: 'click',
        object: this.#applyButton,
        listener: (ev) => {
          ev.preventDefault();
          eventBus.emit(VACANCY_APPLY, { vacancyId: this.#vacancyId });
        },
      });
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
}
