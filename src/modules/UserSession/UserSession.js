import { Api } from '../Api/Api.js';
import { resolveUrl } from '../UrlUtils/UrlUtils.js';
import router from '/src/modules/Router/Router.js';
import { ForbiddenPage } from '/src/modules/Router/Router.js';
import USER_TYPE from './UserType.js';

export const RUSSIAN_USER_TYPE = {};
RUSSIAN_USER_TYPE[USER_TYPE.EMPLOYER] = 'Работодатель';
RUSSIAN_USER_TYPE[USER_TYPE.APPLICANT] = 'Соискатель';

export class UserSession {
  #isLoggedIn;
  #userType;

  constructor() {
    this.#isLoggedIn = false;
    this.#userType = undefined;
  }

  async checkAuthorization() {
    return Api.isAuthenticated().then(
      (val) => {
        if (val.user) {
          this.#isLoggedIn = true;
          this.#userType = val.user.usertype;
          return true;
        }
        this.#isLoggedIn = false;
        return false;
      },
      () => {
        this.#isLoggedIn = false;
        return false;
      },
    );
  }

  async login(body) {
    const loginResponse = await Api.login(body);
    if (!loginResponse) {
      this.#isLoggedIn = false;
      this.#userType = undefined;
    }
    this.#isLoggedIn = true;
    this.#userType = loginResponse.userType;
    return true;
  }

  async logout() {
    this.#isLoggedIn = false;
    Api.logout().then(() => router.navigate(new URL(location.href), true, false));
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
    return '123123';
  }

  getUserFullName() {
    return 'Имя Фамилия';
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
