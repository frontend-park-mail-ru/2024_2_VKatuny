import { ComponentView } from '../../modules/Components/Component.js';
import ProfileMinicardHbs from './profile-minicard.hbs';
import geopositionIconSvg from '@static/img/geoposition-icon.svg';

export class ProfileMinicardView extends ComponentView {
  #avatar;
  #fullName;
  #city;
  #contacts;
  constructor(renderParams, existingElement) {
    renderParams.geopositionIcon = geopositionIconSvg.toString();
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

  static generateRenderParams() {
    return {
      geopositionIcon: geopositionIconSvg,
    };
  }

  renderData({ avatar, fullName, city, contacts }) {
    this.#fullName.innerText = fullName;
    this.#city.innerText = city;
    this.#contacts.innerText = contacts;
    this.#avatar.src = avatar;
  }
}
