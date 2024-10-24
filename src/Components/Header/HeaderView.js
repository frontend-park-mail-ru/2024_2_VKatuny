import { ComponentView } from '/src/modules/Components/Component.js';
import eventBus from '/src/modules/Events/EventBus.js';
import { USER_WANTS_LOGOUT } from '../../modules/Events/Events.js';
import { addEventListeners } from '../../modules/Events/EventUtils.js';

export class HeaderView extends ComponentView {
  #logoutButton;

  constructor({ userType, userAuthenticated }, existingElement) {
    super({
      renderParams: { userType, userAuthenticated },
      existingElement,
      templateName: 'header.hbs',
    });
    this.#logoutButton = this._html.querySelector('.user__logout-button');
    if (this.#logoutButton) {
      this._eventListeners.push({
        object: this.#logoutButton,
        event: 'click',
        listener: (ev) => {
          ev.preventDefault();
          console.log('header logout');
          eventBus.emit(USER_WANTS_LOGOUT);
        },
      });
      addEventListeners(this._eventListeners);
    }
  }
}
