import { ComponentView } from '../../modules/Components/Component';

class FrameSeriesView extends ComponentView {
    #frameSelector;
    #frameContainer;
    #frames;
  constructor({ elementClass }, existingElement) {
    super({
      renderParams: { elementClass },
      existingElement,
      templateName: 'frame-series.hbs',
    });
    this.#frameSelector = this._html.querySelector('.frame-series__frame-selector');
    this.#frameContainer = this._html.querySelector('.frame-series__frame-container');
    this.#frames = {};
  }

  addFrame({frameName, frameCaption, frameRender}) {
    this.#frames[frameName] = {frameCaption, frameRender};
    const frameChoice = new ComponentView({
        renderParams: {
            elementClass: `frame-selector__${frameName}`,
            frameCaption
        },
        templateName: 'frame-choice.hbs'
    });
    this.#frameSelector.addChild(frameChoice.render());
    this.#frameContainer.addChild(frameRender);
  }

}
