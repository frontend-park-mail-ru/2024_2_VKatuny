import { ComponentController } from "../../modules/Components/Component.js";

export class FrameSeriesController extends ComponentController {
    constructor(model, view, component) {
        super(model, view, component);
    }

    addFrame({frameName, frameCaption, frameComponent}) {
        this._view.addFrame({frameName, frameCaption, frameRender: frameComponent.render()});
    }
}