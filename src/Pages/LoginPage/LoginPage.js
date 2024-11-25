import { LoginPageController } from './LoginPageController';
import { LoginPageView } from './LoginPageView';
import { LoginPageModel } from './LoginPageModel';
import { Page } from '@/modules/Page/Page';
import { LoginForm } from '@/Components/LoginForm/LoginForm';
import state from '@/modules/AppState/AppState';

export class LoginPage extends Page {
  #loginForm;
  constructor({ url }) {
    super({
      url,
      modelClass: LoginPageModel,
      viewClass: LoginPageView,
      controllerClass: LoginPageController,
    });
    state.userSession.goToHomePageIfLoggedIn();
  }

  postRenderInit() {
    this.#loginForm = new LoginForm({ existingElement: this._view.loginForm });
    this._children.push(this.#loginForm);
  }

  get loginForm() {
    return this.#loginForm;
  }
}
