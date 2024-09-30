import { Page } from '/src/modules/Page/Page.js';
import { addEventListeners } from '../EventUtils/EventUtils.js';
import {
  ERROR_MESSAGES,
  validateEmail,
  validateEmptyFields,
  validatePassword,
  validateUserType,
} from '../FormValidationUtils/FormValidationUtils.js';

/** A class representing the login page.
 * @extends Page
 */
export class LoginPage extends Page {
  #loginForm;
  #errorMessage;

  /**
   * Create an instance of LoginPage
   * @param {URL} url - a URL object containing the link with which this page was navigated
   * @throws {TypeError} url is not an instance of URL
   */
  constructor({ url, state }) {
    super({ url });
    this._state = state;
  }

  error(text) {
    setTimeout(() => {
      this.#errorMessage.style.display = 'none';
    }, 3000);
    this.#errorMessage.style.display = 'block';
    this.#errorMessage.innerText = text;
  }

  postRenderInit() {
    this.#loginForm = document.getElementById('login-form');
    this.#errorMessage = document.getElementById('error-message');
    this._eventListeners.push({
      event: 'submit',
      object: this.#loginForm,
      listener: (ev) => {
        ev.preventDefault(), this._handleLogin();
      },
    });
    addEventListeners(this._eventListeners);
  }

  async _handleLogin() {
    const data = new FormData(this.#loginForm);
    const emptyFields = validateEmptyFields(data.entries());
    if (emptyFields.length > 0) {
      this.error('Заполните пустые поля');
      return;
    }

    const validators = {
      'user-type': validateUserType,
      email: validateEmail,
      password: validatePassword,
    };

    const invalidFields = [];
    for (const entry of data) {
      if (!validators[entry[0]](entry[1])) {
        invalidFields.push(entry[0]);
      }
    }
    if (invalidFields.length > 0) {
      this.error(
        invalidFields.reduce((message, invalidField) => {
          message += `${ERROR_MESSAGES[invalidField]}\n`;
          return message;
        }, ''),
      );
      return;
    }

    await this._state.userSession
      .login({
        userType: data.get('user-type'),
        login: data.get('email'),
        password: data.get('password'),
      })
      .catch(() => this.error('Неверный email или пароль'));
  }

  /**
   * Render this page.
   * @returns {string} HTML representation of the page
   */
  render() {
    return Handlebars.templates['login.hbs']();
  }
}
