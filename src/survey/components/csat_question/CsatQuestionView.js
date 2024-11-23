import { ComponentView } from '@/modules/Components/Component';
import CsatQuestionHbs from './csat-question.hbs';
import eventBus from '@/modules/Events/EventBus';
import { SUBMIT_ANSWER } from '@/modules/Events/Events';
import { addEventListeners } from '@/modules/Events/EventUtils';
import './csat-question.scss';

export class CsatQuestionView extends ComponentView {
  #skipButton;
  #starList;
  constructor(renderParams, existingElement) {
    super({
      renderParams,
      existingElement,
      template: CsatQuestionHbs,
    });
    this.#skipButton = this._html.querySelector('.csat-question__skip-button');
    this.#starList = this._html.querySelector('.csat-question__star-list');
    this._eventListeners.push({
      event: 'click',
      object: this.#skipButton,
      listener: this.handleNext,
    });
    addEventListeners(this._eventListeners);
  }

  handleNext = (ev) => {
    ev.preventDefault();
    const checkedInput = this.#starList.querySelector('input:checked');
    eventBus.emit(SUBMIT_ANSWER, {
      caller: this,
      answer: checkedInput ? +checkedInput.value : null,
    });
  };
}
