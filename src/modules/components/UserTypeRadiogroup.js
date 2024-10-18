import { Component } from './Component.js';
import { addEventListeners } from '../Events/EventUtils.js';

export class UserTypeRadiogroup extends Component {
  #applicant;
  #employer;
  #checked;

  constructor(renderParams, existingElement = null) {
    super({ renderParams, existingElement, templateName: 'user-type-radiogroup.hbs' });
    this.#applicant = this._html.querySelector('.user-type-radiogroup__applicant');
    this.#employer = this._html.querySelector('.user-type-radiogroup__employer');
    this.#checked = this.#applicant;

    this._eventListeners.push(
      {
        event: 'click',
        object: this.#applicant,
        listener: function () {
          this.setActive(this.#applicant);
        }.bind(this),
      },
      {
        event: 'click',
        object: this.#employer,
        listener: function () {
          this.setActive(this.#employer);
        }.bind(this),
      },
    );
    addEventListeners(this._eventListeners);
  }

  setActive(element) {
    if (element === this.#checked) {
      return;
    }
    this.#checked.classList.remove('user-type-radiobutton_checked');
    this.#checked.querySelector('.user-type-radiobutton__input').removeAttribute('checked');
    element.classList.add('user-type-radiobutton_checked');
    element.querySelector('.user-type-radiobutton__input').setAttribute('checked', '');
    this.#checked = element;
  }
}
