import { ComponentController } from '../../../modules/Components/Component.js';
import { MINICARD_DELETE } from '../../../modules/Events/Events.js';

export class ListController extends ComponentController {
  constructor(model, view, component) {
    super(model, view, component);
    this.setHandlers([
      {
        event: MINICARD_DELETE,
        handler: this.removeMinicard.bind(this),
      },
    ]);
  }

  loadList() {
    this._model.getItems().forEach((item) => {
      this._view.addChild(item.render());
      this._component.bindMinicard(item);
    });
  }

  removeMinicard({ caller }) {
    const minicardIndex = this._view.findChildIndex(caller.render());
    if (minicardIndex >= 0) {
      this._component.unbindMinicard(minicardIndex);
      this._view.removeChild(minicardIndex);
    }
  }
}
