import { ComponentController } from '../../modules/Components/Component.js';
import { USER_UPDATED } from '../../modules/Events/Events.js';

export class ProfileMinicardController extends ComponentController {
  constructor(model, view, component) {
    super(model, view, component);
    this.setHandlers([
      {
        event: USER_UPDATED,
        handler: this.updateInfo.bind(this),
      },
    ]);
  }

  async updateInfo() {
    this._view.renderData(await this._model.getData());
  }
}
