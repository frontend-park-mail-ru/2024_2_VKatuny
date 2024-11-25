import { ComponentController } from '@/modules/Components/Component';

export class SelectInputController extends ComponentController {
  constructor(model, view, component) {
    super(model, view, component);
  }

  loadOptions(options) {
    options.forEach(({ value, caption }) => {
      this._view.addOption({ value, caption });
    });
  }
}
