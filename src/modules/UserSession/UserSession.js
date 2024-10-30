import { Api } from '../Api/Api.js';
import { resolveUrl } from '../UrlUtils/UrlUtils.js';
import router from '/src/modules/Router/Router.js';
import { ForbiddenPage } from '/src/modules/Router/Router.js';

export const USER_TYPES = {
  employer: 'Работодатель',
  applicant: 'Соискатель',
};

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
          this.#userType = USER_TYPES[val.user.usertype];
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
    return await Api.login(body).then((res) => {
      this.#isLoggedIn = res.ok;
      this.#userType = USER_TYPES[body.userType];
      if (res.ok) {
        return true;
      } else {
        return Promise.reject(res.status);
      }
    });
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
