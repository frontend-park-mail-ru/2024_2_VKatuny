import { ComponentView } from '@/modules/Components/Component';
import eventBus from '@/modules/Events/EventBus';
import { SUBMIT_FORM } from '@/modules/Events/Events';
import { addEventListeners } from '@/modules/Events/EventUtils';
import { getFormData } from '@/modules/FormUtils/FormUtils';
import CvFormHbs from './cv-form.hbs';

export class CvFormView extends ComponentView {
  constructor({ elementClass, isNew }, existingElement) {
    super({
      renderParams: { elementClass, isNew },
      existingElement,
      template: CvFormHbs,
    });
    this.positionRuField = this._html.querySelector('.cv-form__position-ru');
    this.positionEnField = this._html.querySelector('.cv-form__position-en');
    this.jobSearchStatusField = this._html.querySelector('.cv-form__job-search-status');
    this.descriptionField = this._html.querySelector('.cv-form__description');
    this.workingExperienceField = this._html.querySelector('.cv-form__working-experience');

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
    return 'cv-form';
  }

  renderData({ positionRu, positionEn, jobSearchStatus, description, workingExperience }) {
    this.positionRuField.querySelector('.validated-input__input').value = positionRu;
    this.positionEnField.querySelector('.validated-input__input').value = positionEn;
    this.jobSearchStatusField.querySelector('.validated-input__input').value = jobSearchStatus;
    this.descriptionField.querySelector('.validated-textarea__textarea').value = description;
    this.workingExperienceField.querySelector('.validated-textarea__textarea').value =
      workingExperience;
  }
}
