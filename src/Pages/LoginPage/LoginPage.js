import { LoginPageController } from './LoginPageController.js';
import { LoginPageView } from './LoginPageView.js';
import { LoginPageModel } from './LoginPageModel.js';
import { Page } from '/src/modules/Page/Page.js';
import { LoginForm } from '/src/Components/LoginForm/LoginForm.js';

export class LoginPage extends Page {
  #loginForm;
  constructor({ url }) {
    super({
      url,
      modelClass: LoginPageModel,
      viewClass: LoginPageView,
      controllerClass: LoginPageController,
    });
  }

  postRenderInit() {
    this.#loginForm = new LoginForm({}, this._view.loginForm);
    this._children.push(this.#loginForm);
  }

  get loginForm() {
    return this.#loginForm;
  }
}
