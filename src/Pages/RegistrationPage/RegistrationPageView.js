import { PageView } from '@/modules/Page/Page';
import RegistrationPageHbs from './registration-page.hbs';

export class RegistrationPageView extends PageView {
  #applicantForm;
  #employerForm;
  #userTypeRadiogroup;
  #submitButton;

  #APPLICANT_FORM = 'applicant-registration-form';
  #EMPLOYER_FORM = 'employer-registration-form';

  constructor() {
    super({
      template: RegistrationPageHbs,
    });
    this.#userTypeRadiogroup = this._html.querySelector(
      '.registration-container__user-type-radiogroup',
    );
    this.#applicantForm = this._html.querySelector(
      '.registration-container__applicant-registration-form',
    );
    this.#employerForm = this._html.querySelector(
      '.registration-container__employer-registration-form',
    );
    this.#submitButton = this._html.querySelector('.registration-container__submit-button');
    this.setApplicantForm();
  }

  setApplicantForm() {
    this.#employerForm.style.display = 'none';
    this.#applicantForm.style.display = 'block';
    this.#submitButton.setAttribute('form', this.#APPLICANT_FORM);
  }

  setEmployerForm() {
    this.#employerForm.style.display = 'block';
    this.#applicantForm.style.display = 'none';
    this.#submitButton.setAttribute('form', this.#EMPLOYER_FORM);
  }

  get userTypeRadiogroup() {
    return this.#userTypeRadiogroup;
  }

  get applicantForm() {
    return this.#applicantForm;
  }

  get employerForm() {
    return this.#employerForm;
  }
}
