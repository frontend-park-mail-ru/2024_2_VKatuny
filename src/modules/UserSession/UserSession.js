import { Api } from '../Api/Api.js';
import { resolveUrl } from '../UrlUtils/UrlUtils.js';
import router from '/src/modules/Router/Router.js';
import { ForbiddenPage } from '/src/modules/Router/Router.js';
import { Applicant } from '../models/Applicant.js';
import { Employer } from '../models/Employer.js';
import USER_TYPE from './UserType.js';

export const RUSSIAN_USER_TYPE = {};
RUSSIAN_USER_TYPE[USER_TYPE.EMPLOYER] = 'Работодатель';
RUSSIAN_USER_TYPE[USER_TYPE.APPLICANT] = 'Соискатель';

export class UserSession {
  #isLoggedIn;
  #userType;
  #user;

  constructor() {
    this.#isLoggedIn = false;
    this.#userType = undefined;
  }

  async checkAuthorization() {
    try {
      const authResponse = await Api.isAuthenticated();
      this.#isLoggedIn = true;
      this.#userType = authResponse.userType;
      this.#user =
        this.#userType === USER_TYPE.APPLICANT
          ? new Applicant(authResponse)
          : new Employer(authResponse);
    } catch (err) {
      console.log(err);
      this.#isLoggedIn = false;
      this.#userType = undefined;
      this.#user = undefined;
      return err;
    }
  }

  async login(body) {
    try {
      const loginResponse = await Api.login(body);
      this.#isLoggedIn = true;
      this.#userType = body.userType;
      this.#user =
        this.#userType === USER_TYPE.APPLICANT
          ? new Applicant(loginResponse)
          : new Employer(loginResponse);
      return '';
    } catch (err) {
      console.log(err);
      this.#isLoggedIn = false;
      this.#userType = undefined;
      this.#user = undefined;
      throw err;
    }
  }

  async logout() {
    try {
      await Api.logout();
      this.#isLoggedIn = false;
      this.#userType = undefined;
      this.#user = undefined;
      router.navigate(new URL(location.href), true, false);
    } catch (err) {
      console.log(err);
    }
  }

  async register(userType, body) {
    try {
      const response =
        userType === USER_TYPE.APPLICANT
          ? await Api.registerApplicant(body)
          : await Api.registerEmployer(body);
      this.#isLoggedIn = true;
      this.#userType = userType;
      this.#user =
        this.#userType === USER_TYPE.APPLICANT ? new Applicant(response) : new Employer(response);
    } catch (err) {
      console.log(err);
      this.#isLoggedIn = false;
      this.#userType = undefined;
      this.#user = undefined;
      throw err;
    }
  }

  get isLoggedIn() {
    return this.#isLoggedIn;
  }

  get userType() {
    return this.#userType;
  }

  get russianUserType() {
    return RUSSIAN_USER_TYPE[this.#userType];
  }

  get userId() {
    return this.#user ? this.#user.id : undefined;
  }

  getUserFullName() {
    return this.#user ? `${this.#user.firstName} ${this.#user.secondName}` : undefined;
  }

  goToHomePageIfLoggedIn() {
    if (this.#isLoggedIn) {
      throw new ForbiddenPage(resolveUrl('vacancies'));
    }
  }

  goToHomePageIfNotLoggedIn() {
    if (!this.#isLoggedIn) {
      throw new ForbiddenPage(resolveUrl('vacancies'));
    }
  }
}
