import { ComponentController } from '../../modules/Components/Component.js';
import { REGISTER_APPLICANT } from '../../modules/Events/Events.js';
import router from '/src/modules/Router/Router.js';
import { resolveUrl } from '../../modules/UrlUtils/UrlUtils.js';

export class ApplicantRegistrationFormController extends ComponentController {
  constructor(model, view, controller) {
    super(model, view, controller);
    this.setHandlers([
      {
        event: REGISTER_APPLICANT,
        handler: this.register.bind(this),
      },
    ]);
  }

  register(formData) {
    if (!this._validate(formData)) {
      return;
    }
    this._model
      .register(formData)
      .then(() => router.navigate(new URL(resolveUrl('vacancies')), true, true))
      .catch((errorMsg) => {
        this._view.declineValidation(errorMsg);
      });
  }

  _validate(formData) {
    this._view.hideError();
    const formValidationError = this._model.validate(formData);
    if (formValidationError) {
      this._view.declineValidation(formValidationError);
      return false;
    }
    if (
      ![
        this._component._firstNameField.controller.validateInput({
          callerView: this._component._firstNameField._view,
        }),

        this._component._secondNameField.controller.validateInput({
          callerView: this._component._secondNameField._view,
        }),

        this._component._birthDateField.controller.validateInput({
          callerView: this._component._birthDateField._view,
        }),

        this._component._emailField.controller.validateInput({
          callerView: this._component._emailField._view,
        }),

        this._component._passwordField.controller.validateInput({
          callerView: this._component._passwordField._view,
        }),
      ].every((val) => val)
    ) {
      return false;
    }
    return true;
  }
}