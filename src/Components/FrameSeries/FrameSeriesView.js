import { ComponentView } from '@/modules/Components/Component';
import eventBus from '@/modules/Events/EventBus';
import { SELECT_FRAME } from '@/modules/Events/Events';
import { addEventListeners } from '@/modules/Events/EventUtils';
import FrameSeriesHbs from './frame-series.hbs';
import FrameChoiceHbs from './frame-choice.hbs';

export class FrameSeriesView extends ComponentView {
  #frameSelector;
  #frameContainer;
  #frames;
  #active;
  constructor({ elementClass }, existingElement) {
    super({
      renderParams: { elementClass },
      existingElement,
      templateName: FrameSeriesHbs,
    });
    this.#frameSelector = this._html.querySelector('.frame-series__frame-selector');
    this.#frameContainer = this._html.querySelector('.frame-series__frame-container');
    this.#frames = {};
    this.#active = undefined;
  }

  addFrame({ frameName, frameCaption, frameRender }) {
    const frameChoice = new ComponentView({
      renderParams: {
        elementClass: `frame-selector__${frameName}`,
        frameCaption,
      },
      template: FrameChoiceHbs,
    });
    const frameChoiceHtml = frameChoice.render();
    if (Object.keys(this.#frames).length > 0) {
      frameRender.classList.add('hidden');
    } else {
      this.#active = frameName;
      frameChoiceHtml.classList.add('frame-choice_active');
    }
    const eventListener = {
      object: frameChoiceHtml,
      event: 'click',
      listener: (ev) => {
        ev.preventDefault();
        eventBus.emit(SELECT_FRAME, { frameName });
      },
    };
    this._eventListeners.push(eventListener);
    addEventListeners([eventListener]);
    this.#frames[frameName] = frameRender;
    this.#frameSelector.appendChild(frameChoiceHtml);
    this.#frameContainer.appendChild(frameRender);
  }

  selectFrame(frameName) {
    this.#frames[this.#active].classList.toggle('hidden');
    const prevButton = this.#frameSelector.querySelector(`.frame-selector__${this.#active}`);
    prevButton.classList.remove('frame-choice_active');
    this.#active = frameName;
    this.#frames[this.#active].classList.toggle('hidden');
    const selectedButton = this.#frameSelector.querySelector(`.frame-selector__${frameName}`);
    selectedButton.classList.add('frame-choice_active');
  }
}
