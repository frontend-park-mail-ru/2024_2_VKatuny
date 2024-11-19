import { ComponentController } from '@/modules/Components/Component';
import { EDIT_FORM, RESET_FORM, SUBMIT_FORM } from '@/modules/Events/Events';

export class CrudFormBoxController extends ComponentController {
  constructor(model, view, component) {
    super(model, view, component);
    this.setHandlers([
      {
        event: EDIT_FORM,
        handler: this.switchToEdit.bind(this),
      },
      {
        event: SUBMIT_FORM,
        handler: this.submitForm.bind(this),
      },
      {
        event: RESET_FORM,
        handler: this.resetForm.bind(this),
      },
    ]);
  }

  switchToEdit({ caller }) {
    if (!Object.is(this._view.formView, caller)) {
      return;
    }
    this._view.editState();
    this._component.enableForm();
  }

  resetForm({ caller }) {
    if (!Object.is(this._view.formView, caller)) {
      return;
    }
    if (!this._component.form.reset()) {
      return;
    }
    this._view.readState();
    this._component.disableForm();
  }

  async submitForm({ caller }) {
    if (!Object.is(this._view.formView, caller)) {
      return;
    }
    const submitResult = await this._component.form.submit();
    if (!submitResult) {
      return;
    }
    this._view.readState();
    this._component.disableForm();
  }
}
