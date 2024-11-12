import { ComponentView } from '../../modules/Components/Component.js';
import eventBus from '../../modules/Events/EventBus.js';
import { MINICARD_DELETE } from '../../modules/Events/Events.js';
import { addEventListeners } from '../../modules/Events/EventUtils.js';
import MinicardHbs from './minicard.hbs';

export class MinicardView extends ComponentView {
  #deleteButton;
  constructor({ elementClass, isCardOwner, editButtonUrl, title, goToLink }, existingElement) {
    super({
      renderParams: { elementClass, isCardOwner, editButtonUrl, title, goToLink },
      existingElement,
      template: MinicardHbs,
    });
    if (isCardOwner) {
      this.#deleteButton = this._html.querySelector('.minicard__button-remove');
      this._eventListeners.push({
        event: 'click',
        object: this.#deleteButton,
        listener: function (ev) {
          ev.preventDefault();
          eventBus.emit(MINICARD_DELETE, { caller: this });
        }.bind(this),
      });
      addEventListeners(this._eventListeners);
    }
  }
}
