import { Api } from '../Api/Api.js';
import { resolveUrl } from '../UrlUtils/UrlUtils.js';

export class UserSession {
  #isLoggedIn;
  #userType;
  #router;

  constructor() {
    this.#isLoggedIn = false;
    this.#userType = undefined;
  }

  set router(router) {
    this.#router = router;
  }

  async checkAuthorization() {
    return Api.isAuthenticated().then((val) => {
      this.#isLoggedIn = val;
    });
  }

  async login(body) {
    return Api.login(body).then((res) => {
      this.#isLoggedIn = res.ok;
      this.#userType = body.userType;
      if (res.ok) {
        this.#router.navigate(new URL(resolveUrl('vacancies')), true, true);
        return Promise.resolve();
      } else {
        return Promise.reject();
      }
    });
  }

  async logout() {
    this.#isLoggedIn = false;
    Api.logout().then(() => this.#router.navigate(new URL(location.href), true, false));
  }

  get isLoggedIn() {
    return this.#isLoggedIn;
  }

  get userType() {
    return this.#userType;
  }
}
