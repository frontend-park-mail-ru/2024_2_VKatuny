import { ComponentController } from '@/modules/Components/Component';
import { SELECT_FRAME } from '@/modules/Events/Events';

export class FrameSeriesController extends ComponentController {
  constructor(model, view, component) {
    super(model, view, component);
    this.setHandlers([
      {
        event: SELECT_FRAME,
        handler: this.selectFrame.bind(this),
      },
    ]);
  }

  addFrame({ frameName, frameCaption, frameComponent }) {
    this._view.addFrame({ frameName, frameCaption, frameRender: frameComponent.render() });
  }

  selectFrame({ frameName }) {
    this._view.selectFrame(frameName);
  }
}
