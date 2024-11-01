import { ComponentController } from '../../modules/Components/Component.js';
import { UPDATE_PROFILE } from '../../modules/Events/Events.js';

export class EmployerProfileFormController extends ComponentController {
  constructor(model, view, controller) {
    super(model, view, controller);
    this.setHandlers([
      {
        event: UPDATE_PROFILE,
        handler: this.updateProfile.bind(this),
      },
    ]);
  }

  updateProfile() {
    if (!this._validate()) {
      return;
    }
  }

  _validate() {
    return [
      this._component._firstNameField.controller.validateInput({
        callerView: this._component._firstNameField._view,
      }),

      this._component._secondNameField.controller.validateInput({
        callerView: this._component._secondNameField._view,
      }),

      this._component._cityField.controller.validateInput({
        callerView: this._component._cityField._view,
      }),

      this._component._contactsField.controller.validateInput({
        callerView: this._component._contactsField._view,
      }),
    ].every((val) => val);
  }
}
