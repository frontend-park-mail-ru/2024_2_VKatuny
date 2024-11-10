import { PageView } from '../../modules/Page/Page.js';
import LoginPageHbs from './login-page.hbs';

export class LoginPageView extends PageView {
  #loginForm;
  constructor() {
    super({
      template: LoginPageHbs,
    });
    this.#loginForm = this._html.querySelector('.login-container__login-form');
  }

  get loginForm() {
    return this.#loginForm;
  }
}
