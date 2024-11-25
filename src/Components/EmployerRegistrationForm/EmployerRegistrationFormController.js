import { ComponentController } from '@/modules/Components/Component';
import router from '@/modules/Router/Router';
import { resolveUrl } from '@/modules/UrlUtils/UrlUtils';
import { REGISTER_EMPLOYER } from '@/modules/Events/Events';

export class EmployerRegistrationFormController extends ComponentController {
  constructor(model, view, controller) {
    super(model, view, controller);
    this.setHandlers([
      {
        event: REGISTER_EMPLOYER,
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

        this._component._positionField.controller.validateInput({
          callerView: this._component._positionField._view,
        }),

        this._component._companyNameField.controller.validateInput({
          callerView: this._component._companyNameField._view,
        }),

        this._component._companyDescriptionField.controller.validateInput({
          callerView: this._component._companyDescriptionField._view,
        }),

        this._component._websiteField.controller.validateInput({
          callerView: this._component._websiteField._view,
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
