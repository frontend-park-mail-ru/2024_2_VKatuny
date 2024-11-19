import { Component } from '@/modules/Components/Component';
import { FrameSeriesController } from './FrameSeriesController';
import { FrameSeriesModel } from './FrameSeriesModel';
import { FrameSeriesView } from './FrameSeriesView';

export class FrameSeries extends Component {
  constructor({ frames, startingFrame, viewParams, existingElement }) {
    super({
      modelClass: FrameSeriesModel,
      viewClass: FrameSeriesView,
      viewParams: viewParams,
      existingElement,
      controllerClass: FrameSeriesController,
    });
    this._frames = {};
    frames.forEach(this.addFrame.bind(this));
    if (startingFrame) {
      this._controller.selectFrame({ frameName: startingFrame });
    }
  }

  addFrame({ frameName, frameCaption, frameComponent }) {
    this._frames[frameName] = frameComponent;
    this._controller.addFrame({ frameName, frameCaption, frameComponent });
    this._children.push(frameComponent);
  }
}
