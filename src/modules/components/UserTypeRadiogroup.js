import { Component } from './Component.js';

export class UserTypeRadiogroup extends Component {
  #applicant;
  #employer;
  constructor(renderParams, existingElement = null) {
    super({ renderParams, existingElement, templateName: 'user-type-radiogroup.hbs' });
    this.#applicant = this._html.querySelector('user-type-radiogroup__applicant');
    this.#employer = this._html.querySelector('user-type-radiogroup__employer');
    this.#
  }

  setEvents() {
  };
}
