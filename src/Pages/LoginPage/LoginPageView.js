import { PageView } from '../../modules/Page/Page.js';

export class LoginPageView extends PageView {
  #loginForm;
  constructor() {
    super({
      templateName: 'login-page.hbs',
    });
    this.#loginForm = this._html.querySelector('.login-container__login-form');
  }

  get loginForm() {
    return this.#loginForm;
  }
}
