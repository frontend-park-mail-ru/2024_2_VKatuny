import { Api } from '../Api/Api.js';
import { resolveUrl } from '../UrlUtils/UrlUtils.js';
import router from '/src/modules/Router/Router.js';

export const USER_TYPES = {
  employer: 'работодатель',
  applicant: 'соискатель',
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
    return await Api.login(body).then((res) => {
      this.#isLoggedIn = res.ok;
      this.#userType = body.userType;
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

  goToHomePageIfLoggedIn() {
    if (this.#isLoggedIn) {
      router.navigate(new URL(resolveUrl('vacancies')), true, false);
    }
  }
}
