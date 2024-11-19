import { ComponentView } from '@/modules/Components/Component';
import eventBus from '@/modules/Events/EventBus';
import { SUBMIT_FORM } from '@/modules/Events/Events';
import { addEventListeners } from '@/modules/Events/EventUtils';
import { getFormData } from '@/modules/FormUtils/FormUtils';
import VacancyFormHbs from './vacancy-form.hbs';

export class VacancyFormView extends ComponentView {
  constructor({ elementClass, isNew, vacancyId }, existingElement) {
    super({
      renderParams: { elementClass, isNew, vacancyId },
      existingElement,
      template: VacancyFormHbs,
    });
    this.positionField = this._html.querySelector('.vacancy-form__position');
    this.workTypeField = this._html.querySelector('.vacancy-form__work-type');
    this.locationField = this._html.querySelector('.vacancy-form__location');
    this.salaryField = this._html.querySelector('.vacancy-form__salary');
    this.descriptionField = this._html.querySelector('.vacancy-form__description');
    this._eventListeners.push({
      event: 'submit',
      object: this._html,
      listener: function (ev) {
        ev.preventDefault();
        eventBus.emit(SUBMIT_FORM, { caller: this });
      }.bind(this),
    });
    addEventListeners(this._eventListeners);
  }

  getData() {
    return getFormData(this._html);
  }

  getId() {
    return 'vacancy-form';
  }

  renderData({ position, workType, salary, location, description }) {
    this.positionField.querySelector('.validated-input__input').value = position;
    this.workTypeField.querySelector('.validated-input__input').value = workType;
    this.locationField.querySelector('.validated-input__input').value = location;
    this.salaryField.querySelector('.validated-input__input').value = salary;
    this.descriptionField.querySelector('.validated-textarea__textarea').value = description;
  }
}
