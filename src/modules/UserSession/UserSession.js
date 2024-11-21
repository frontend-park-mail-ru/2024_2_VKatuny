import { Api } from '@/modules/api/Api';
import { resolveUrl } from '@/modules/UrlUtils/UrlUtils';
import router from '@/modules/Router/Router';
import { ForbiddenPage } from '@/modules/Router/Router';
import { Applicant } from '@/modules/models/Applicant';
import { Employer } from '@/modules/models/Employer';
import USER_TYPE from './UserType';

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
      this.#user = await this.getUser(this.#userType, authResponse.id);
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
      this.#user = await this.getUser(this.#userType, loginResponse.id);
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
      this.#user = await this.getUser(this.#userType, response.id);
    } catch (err) {
      console.log(err);
      this.#isLoggedIn = false;
      this.#userType = undefined;
      this.#user = undefined;
      throw err;
    }
  }

  async getUser(userType, id) {
    return userType === USER_TYPE.APPLICANT
      ? new Applicant(await Api.getApplicantById({ id }))
      : new Employer(await Api.getEmployerById({ id }));
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

  get avatar() {
    return this.#user ? this.#user.avatar : undefined;
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
