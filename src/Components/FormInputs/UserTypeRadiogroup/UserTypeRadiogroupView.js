import { ComponentView } from '@/modules/Components/Component';
import { addEventListeners } from '@/modules/Events/EventUtils';
import eventBus from '@/modules/Events/EventBus';
import { CHANGE_USER_TYPE } from '@/modules/Events/Events';
import USER_TYPE from '@/modules/UserSession/UserType';
import UserTypeRadiogroupHbs from './user-type-radiogroup.hbs';

export class UserTypeRadiogroupView extends ComponentView {
  #applicant;
  #employer;
  #checked;
  constructor(renderParams, existingElement) {
    super({
      renderParams: renderParams,
      existingElement,
      templateName: UserTypeRadiogroupHbs,
    });
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

    const eventTarget = element === this.#applicant ? USER_TYPE.APPLICANT : USER_TYPE.EMPLOYER;
    eventBus.emit(CHANGE_USER_TYPE, eventTarget);
  }
}
