import { ComponentController } from '/src/modules/Components/Component.js';
import { VALIDATE_INPUT } from '/src/modules/Events/Events.js';
export class ValidatedInputController extends ComponentController {
  constructor(model, view, component, { selfValidate = false }) {
    super(model, view, component);
    if (selfValidate) {
      this.setHandlers([
        {
          event: VALIDATE_INPUT,
          handler: this.validateInput.bind(this),
        },
      ]);
    }
  }

  validateInput({ callerView }) {
    if (!Object.is(callerView, this._view)) {
      return;
    }
    const validationError = this._model.validate(this._view.getData());
    if (validationError) {
      this._view.declineValidation(validationError);
      return false;
    }
    this._view.approveValidation();
    return true;
  }
}
