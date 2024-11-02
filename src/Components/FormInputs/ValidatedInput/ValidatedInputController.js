import { ComponentController } from '/src/modules/Components/Component.js';
import { VALIDATE_INPUT } from '/src/modules/Events/Events.js';
export class ValidatedInputController extends ComponentController {
  constructor(model, view, component, { selfValidate = false }) {
    super(model, view, component);
    this._selfValidate = selfValidate;
    this.initHandlers();
  }

  validateInput({ callerView }) {
    if (!Object.is(callerView, this._view)) {
      return;
    }
    const fieldData = this._view.getData();
    if (!fieldData.trim()) {
      this._view.resetValidation();
    }
    const validationError = this._model.validate(fieldData);
    if (validationError) {
      this._view.declineValidation(validationError);
      return false;
    }
    this._view.approveValidation();
    return true;
  }

  initHandlers() {
    if (this._selfValidate) {
      this.setHandlers([
        {
          event: VALIDATE_INPUT,
          handler: this.validateInput.bind(this),
        },
      ]);
    }
  }

  enable() {
    this._view.enable();
  }

  disable() {
    this._view.disable();
  }
}
