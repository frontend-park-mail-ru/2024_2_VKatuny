import { ComponentController } from '@/modules/Components/Component';
import { USER_WANTS_LOGIN } from '@/modules/Events/Events';
import { resolveUrl } from '@/modules/UrlUtils/UrlUtils';
import router from '@/modules/Router/Router';
import { NOTIFICATION_OK } from '@/modules/Events/Events';
import eventBus from '@/modules/Events/EventBus';

export class LoginFormController extends ComponentController {
  constructor(model, view, component) {
    super(model, view, component);
    this.setHandlers([
      {
        event: USER_WANTS_LOGIN,
        handler: this.login.bind(this),
      },
    ]);
  }

  _validate(formData) {
    const formValidationError = this._model.validate(formData);
    if (formValidationError) {
      this._view.declineValidation(formValidationError);
      return false;
    }
    if (
      ![
        this._component.emailInput._controller.validateInput({
          callerView: this._component.emailInput.view,
        }),
        this._component.passInput._controller.validateInput({
          callerView: this._component.passInput.view,
        }),
      ].every((val) => val)
    ) {
      return false;
    }
    return true;
  }

  login(formData) {
    if (!this._validate(formData)) {
      return;
    }
    this._model
      .login(formData)
      .then(() => {
        eventBus.emit(NOTIFICATION_OK, { message: 'Вы успешно вошли', timeout: 3000 });
        router.navigate(new URL(resolveUrl('vacancies')), true, true);
      })
      .catch((errorMsg) => {
        this._view.declineValidation(errorMsg);
      });
  }
}
