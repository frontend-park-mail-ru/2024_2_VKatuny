import { CV_DELETE, CV_EDIT } from '@/modules/Events/Events';
import { addEventListeners } from '@/modules/Events/EventUtils';
import { ComponentView } from '/src/modules/Components/Component';
import eventBus from '@/modules/Events/EventBus';
import ButtonContainerHbs from './cv-article__button-container.hbs';

export class ButtonContainerView extends ComponentView {
  #editButton;
  #deleteButton;
  #cvId;
  constructor({ isOwner, isEmployer, ownerId, cvId }, existingElement) {
    super({
      renderParams: { isOwner, isEmployer, ownerId },
      existingElement,
      template: ButtonContainerHbs,
    });
    this.#cvId = cvId;
    if (isOwner) {
      this.#editButton = this._html.querySelector('.cv-article__edit-button');
      this.#deleteButton = this._html.querySelector('.cv-article__delete-button');
      this._eventListeners.push(
        {
          event: 'click',
          object: this.#editButton,
          listener: function (ev) {
            ev.preventDefault();
            eventBus.emit(CV_EDIT, { vacancyId: this.#cvId });
          }.bind(this),
        },
        {
          event: 'click',
          object: this.#deleteButton,
          listener: function (ev) {
            ev.preventDefault();
            eventBus.emit(CV_DELETE, { vacancyId: this.#cvId });
          }.bind(this),
        },
      );
    }
    addEventListeners(this._eventListeners);
  }
}
