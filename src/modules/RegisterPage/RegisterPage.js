import { Page } from '/src/modules/Page/Page.js';
import { addEventListeners } from '/src/modules/EventUtils/EventUtils.js';
import {
  validateEmail,
  validateEmptyFields,
  validatePassword,
  validateOk,
  makeValidateLen,
  validateDate,
  ERROR_MESSAGES,
  FIRSTNAME_MIN_LEN,
  FIRSTNAME_MAX_LEN,
  LASTNAME_MIN_LEN,
  LASTNAME_MAX_LEN,
  POSITION_MIN_LEN,
  POSITION_MAX_LEN,
  COMPANY_NAME_MIN_LEN,
  COMPANY_NAME_MAX_LEN,
  WEBSITE_MIN_LEN,
  WEBSITE_MAX_LEN,
  COMPANY_DESCRIPTION_MAX_LEN,
  COMPANY_DESCRIPTION_MIN_LEN,
  EMAIL_MIN_LEN,
  EMAIL_MAX_LEN,
} from '/src/modules/FormValidationUtils/FormValidationUtils.js';
import { Api } from '/src/modules/Api/Api.js';
import { resolveUrl } from '/src/modules/UrlUtils/UrlUtils.js';
import { router } from '/src/index.js';

export class RegisterPage extends Page {
  #errorMessage;
  #applicantRegForm;
  #employerRegForm;
  #submitButton;
  #currentForm;

  #APPLICANT_FORM = 'applicant-form';
  #EMPLOYER_FORM = 'employer-form';

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
    }
    this.#applicantRegForm = document.getElementById('applicant-form');
    this.#employerRegForm = document.getElementById('employer-form');
    this.#errorMessage = document.getElementById('error-message');
    this.#submitButton = document.getElementById('registration-button');
    this.#currentForm = this.#APPLICANT_FORM;

    this._eventListeners.push({
      event: 'submit',
      object: document.getElementById('app'),
      listener: (ev) => {
        ev.preventDefault();
        this._handleRegistration();
      },
    });
    this._eventListeners.push({
      event: 'click',
      object: document.getElementById('applicant'),
      listener: () => {
        if (this.#currentForm !== this.#APPLICANT_FORM) {
          this.setApplicantForm();
        }
      },
    });
    this._eventListeners.push({
      event: 'click',
      object: document.getElementById('employer'),
      listener: () => {
        if (this.#currentForm !== this.#EMPLOYER_FORM) {
          this.setEmployerForm();
        }
      },
    });

    addEventListeners(this._eventListeners);
  }

  setApplicantForm() {
    this.#employerRegForm.style.display = 'none';
    this.#applicantRegForm.style.display = 'block';
    this.#submitButton.setAttribute('form', this.#APPLICANT_FORM);
    this.#currentForm = this.#APPLICANT_FORM;
  }

  setEmployerForm() {
    this.#employerRegForm.style.display = 'block';
    this.#applicantRegForm.style.display = 'none';
    this.#submitButton.setAttribute('form', this.#EMPLOYER_FORM);
    this.#currentForm = this.#EMPLOYER_FORM;
  }

  async _handleRegistration() {
    const currentFormHtml =
      this.#currentForm === this.#APPLICANT_FORM ? this.#applicantRegForm : this.#employerRegForm;
    const data = new FormData(currentFormHtml);
    const emptyFields = validateEmptyFields(Array.from(data.entries()));
    if (emptyFields.length > 0) {
      this.error('Заполните пустые поля');
      return;
    }

    const validators = {
      name: [makeValidateLen(FIRSTNAME_MIN_LEN, FIRSTNAME_MAX_LEN)],
      lastname: [makeValidateLen(LASTNAME_MIN_LEN, LASTNAME_MAX_LEN)],
      position: [makeValidateLen(POSITION_MIN_LEN, POSITION_MAX_LEN)],
      'company-name': [makeValidateLen(COMPANY_NAME_MIN_LEN, COMPANY_NAME_MAX_LEN)],
      'company-description': [
        makeValidateLen(COMPANY_DESCRIPTION_MIN_LEN, COMPANY_DESCRIPTION_MAX_LEN),
      ],
      website: [makeValidateLen(WEBSITE_MIN_LEN, WEBSITE_MAX_LEN)],
      email: [validateEmail, makeValidateLen(EMAIL_MIN_LEN, EMAIL_MAX_LEN)],
      password: [validatePassword],
      'password-repeat': [validateOk],
      birthdate: [validateDate],
    };

    const invalidFields = [];
    Array.from(data.entries()).forEach(([fieldName, value]) => {
      if (!validators[fieldName] || !validators[fieldName].every((validator) => validator(value))) {
        invalidFields.push(fieldName);
      }
    });

    if (data.get('password') !== data.get('password-repeat')) {
      invalidFields.push('notEqualPasswords');
    }

    const errorMessage = invalidFields.reduce((message, field) => {
      message += `${ERROR_MESSAGES[field]}\n`;
      return message;
    }, '');

    if (errorMessage) {
      this.error(errorMessage);
      return;
    }

    let promise;
    let userType;
    if (this.#currentForm === this.#APPLICANT_FORM) {
      promise = Api.registerApplicant({
        firstName: data.get('name'),
        lastName: data.get('lastname'),
        birthDate: data.get('birthdate'),
        email: data.get('email'),
        password: data.get('password'),
      });
      userType = 'applicant';
    } else {
      promise = Api.registerEmployer({
        firstName: data.get('name'),
        lastName: data.get('lastname'),
        position: data.get('position'),
        companyName: data.get('company-name'),
        companyDescription: data.get('company-description'),
        companyWebsite: data.get('website'),
        email: data.get('email'),
        password: data.get('password'),
      });
      userType = 'employer';
    }
    return promise
      .then(async (res) => {
        if (res.ok) {
          return Promise.resolve();
        }
        if (res.status === 400) {
          const body = await res.json();
          if (body.userAlreadyExist) {
            return Promise.reject(
              this.error('Пользователь с таким типом аккаунта и email уже существует'),
            );
          }
        } else {
          return Promise.reject(this.error('Произошла непредвиденная ошибка'));
        }
      })
      .then(() => {
        return this._state.userSession.login({
          userType,
          login: data.get('email'),
          password: data.get('password'),
        });
      });
  }

  /**
   * Render this page.
   * @returns {string} HTML representation of the page
   */
  render() {
    return Handlebars.templates['register.hbs']();
  }
}
