import { ComponentController } from '../../modules/Components/Component.js';
import { USER_WANTS_LOGIN } from '../../modules/Events/Events.js';

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

  login(formData) {
    this._view.hideError();
    const formValidationError = this._model.validate(formData);
    if (formValidationError) {
      this._view.declineValidation(formValidationError);
      return;
    }
    if (
      ![
        this._component.emailInput.controller.validateInput({
          callerView: this._component.emailInput.view,
        }),
        this._component.passInput.controller.validateInput({
          callerView: this._component.passInput.view,
        }),
      ].every((val) => val)
    ) {
      return;
    }

    // await this._state.userSession
    //   .login({
    //     userType: data.get('user-type'),
    //     login: data.get('email'),
    //     password: data.get('password'),
    //   })
    //   .catch((status) => {
    //     if (status === 401) {
    //       this.error('Неверный email или пароль');
    //       return Promise.resolve();
    //     }
    //     return Promise.reject(status);
    //   })
    //   .catch(() => this.error('Произошла непредвиденная ошибка, повторите позднее'));
  }
}
