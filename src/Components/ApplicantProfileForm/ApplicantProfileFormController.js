import { ComponentController } from '../../modules/Components/Component.js';
import eventBus from '../../modules/Events/EventBus.js';
import { NOTIFICATION_OK, USER_UPDATED } from '../../modules/Events/Events.js';
import { NOTIFICATION_TIMEOUT } from '../NotificationBox/NotificationBox.js';

export class ApplicantProfileFormController extends ComponentController {
  constructor(model, view, controller) {
    super(model, view, controller);
  }

  _validate() {
    return [
      this._component._firstNameField.controller.validateInput({
        callerView: this._component._firstNameField._view,
      }),

      this._component._secondNameField.controller.validateInput({
        callerView: this._component._secondNameField._view,
      }),

      this._component._birthDateField.controller.validateInput({
        callerView: this._component._birthDateField._view,
      }),

      this._component._cityField.controller.validateInput({
        callerView: this._component._cityField._view,
      }),

      this._component._educationField.controller.validateInput({
        callerView: this._component._educationField._view,
      }),

      this._component._contactsField.controller.validateInput({
        callerView: this._component._contactsField._view,
      }),
    ].every((val) => val);
  }

  async submit() {
    if (!this._validate() || !(await this._model.submit(this._view.getData()))) {
      return false;
    }
    eventBus.emit(USER_UPDATED);
    eventBus.emit(NOTIFICATION_OK, {
      message: 'Успешно сохранено',
      timeout: NOTIFICATION_TIMEOUT.MEDIUM,
    });
    return true;
  }

  async reset() {
    const oldData = await this._model.lastValidData;
    this._view.renderData(oldData);
    return true;
  }
}
