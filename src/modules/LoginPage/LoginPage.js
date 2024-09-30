import { Page } from '/src/modules/Page/Page.js';
import { addEventListeners } from '../EventUtils/EventUtils.js';
import {
  ERROR_MESSAGES,
  makeValidateLen,
  validateEmail,
  validateEmptyFields,
  validatePassword,
  validateUserType,
} from '../FormValidationUtils/FormValidationUtils.js';
import { router } from '/src/index.js';
import { resolveUrl } from '../UrlUtils/UrlUtils.js';

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
    if (this._state.userSession.isLoggedIn) {
      router.navigate(resolveUrl('vacancies'), true, true);
      return;
    }
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
    const emptyFields = validateEmptyFields(Array.from(data.entries()));
    if (emptyFields.length > 0) {
      this.error('Заполните пустые поля');
      return;
    }

    const validators = {
      'user-type': [validateUserType],
      email: [validateEmail, makeValidateLen(0, 50)],
      password: [validatePassword, makeValidateLen(8, 50)],
    };

    const invalidFields = [];
    Array.from(data.entries()).forEach(([fieldName, value]) => {
      if (!validators[fieldName] || !validators[fieldName].every((validator) => validator(value))) {
        invalidFields.push(fieldName);
      }
    });

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
      .catch((status) => {
        if (status === 401) {
          this.error('Неверный email или пароль');
          return Promise.resolve();
        }
        return Promise.reject(status);
      })
      .catch(() => this.error('Произошла непредвиденная ошибка, повторите позднее'));
  }

  /**
   * Render this page.
   * @returns {string} HTML representation of the page
   */
  render() {
    return Handlebars.templates['login.hbs']();
  }
}
