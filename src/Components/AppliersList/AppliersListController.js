import { ComponentController } from '@/modules/Components/Component';

export class AppliersListController extends ComponentController {
  constructor(model, view, component) {
    super(model, view, component);
  }

  async fillList() {
    const appliers = await this._model.getItems();
    appliers.forEach((applier) => this._view.addListItem(applier));
  }
}
