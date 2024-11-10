import { ComponentView } from '../../modules/Components/Component.js';
import ProfileMinicardHbs from './profile-minicard.hbs';

export class ProfileMinicardView extends ComponentView {
  #avatar;
  #fullName;
  #city;
  #contacts;
  constructor(renderParams, existingElement) {
    super({
      renderParams: renderParams,
      templateName: ProfileMinicardHbs,
      existingElement,
    });
    this.#avatar = this._html.querySelector('.profile-minicard__user-icon');
    this.#fullName = this._html.querySelector('.profile-minicard__user-name');
    this.#city = this._html.querySelector('.profile-minicard__geoposition');
    this.#contacts = this._html.querySelector('.profile-minicard__contacts');
  }

  renderData({ avatar, fullName, city, contacts }) {
    this.#fullName.innerText = fullName;
    this.#city.innerText = city;
    this.#contacts.innerText = contacts;
    this.#avatar.src = avatar;
  }
}
