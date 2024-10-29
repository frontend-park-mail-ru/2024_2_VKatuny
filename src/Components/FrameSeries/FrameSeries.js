import { Component } from '../../modules/Components/Component.js';
import { FrameSeriesController } from './FrameSeriesController.js';
import { FrameSeriesModel } from './FrameSeriesModel.js';
import { FrameSeriesView } from './FrameSeriesView.js';

export class FrameSeries extends Component {
  constructor({frames, viewParams, existingElement}) {
    super({
      modelClass: FrameSeriesModel,
      viewClass: FrameSeriesView,
      viewParams: viewParams,
      existingElement,
      controllerClass: FrameSeriesController,
    });
    frames.forEach(this.addFrame.bind(this));
  }

  addFrame({frameName, frameCaption, frameComponent}) {
    this._frames[frameName] = frameComponent;
    this._controller.addFrame({frameCaption, frameComponent});
    this._children.push(frameComponent);
  }
}
