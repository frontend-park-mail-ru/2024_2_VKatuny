import { Page } from '/src/modules/Page/Page.js';
import { LoginForm } from '/src/modules/components/LoginForm.js';
import { AlertWindow } from '/src/modules/components/AlertWindow.js';
import { resolveUrl } from '../UrlUtils/UrlUtils.js';
import { addEventListeners } from '../EventUtils/EventUtils.js';
import { Api } from '../Api/Api.js';

/** A class representing the login page.
 * @extends Page
 */
export class LoginPage extends Page {
   #loginForm; // Исправлено: с #LoginForm на #loginForm

  /**
   * Create an instance of LoginPage
   * @param {URL} url - a URL object containing the link with which this page was navigated
   * @throws {TypeError} url is not an instance of URL
   */
  constructor({ url, state }) {
    super({ url: url });
    this._state = state;
  }

  postRenderInit() {
       this.#loginForm = new LoginForm({
      elementClass: 'login-form',
      userType: 'applicant', 
    });

    
    document.getElementsByClassName('login-container')[0].appendChild;
    document.login-container.appendChild 
    // Добавляем всплывающее окно с предложением зарегистрироваться
    this._addAlertWindow({
      text: 'Еще не с нами? Зарегистрируйтесь!',
      buttonUrl: resolveUrl('register'),  
      buttonText: 'Зарегистрироваться',  
    });

    // Добавляем обработчик события отправки формы логина
    this.#loginForm.addEventListener('submit', (event) => {
      event.preventDefault(); 
      this._handleLogin();      
    });

    // Добавляем все обработчики событий из массива
    addEventListeners(this._eventListeners);
  }

  async _handleLogin() {
    const email = this.#loginForm.email.value; 
    const password = this.#loginForm.password.value;

    try {
      const response = await Api.login({ email, password });
      if (response.success) {
        console.log('Вход выполнен успешно');
        window.location.href = resolveUrl('vacancies'); 
      } else {
        this._addAlertWindow({
          text: response.message || 'Ошибка входа. Проверьте ваши данные.',
          buttonUrl: resolveUrl('login'),
          buttonText: 'Попробовать снова',
        });
      }
    } catch (error) {
      this._addAlertWindow({
        text: 'Произошла ошибка при входе. Попробуйте позже.', 
        buttonUrl: resolveUrl('login'),
        buttonText: 'Попробовать снова',
      });
      console.error('Ошибка входа:', error);
    }
  }

  _addAlertWindow({ text, buttonUrl, buttonText }) {
    const alertWindow = new AlertWindow({
      elementClass: 'ruler__alert-window',
      text: text,
      buttonUrl: buttonUrl,
      buttonText: buttonText,
    });
    document.body.appendChild(alertWindow.render()); 
    this.#alertWindows.push(alertWindow);
  }

  /**
   * Render this page.
   * @returns {string} HTML representation of the page
   */
  render() {
    return Handlebars.templates['login.hbs'](); 
  }
}
