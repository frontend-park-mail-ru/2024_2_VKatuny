import { Api } from '../Api/Api.js';

export class UserSession {
  #isLoggedIn;
  #router;

  constructor() {
    this.#isLoggedIn = false;
  }

  set router(router) {
    this.#router = router;
  }

  async checkAuthorization() {
    return Api.isAuthenticated().then((val) => {
      this.#isLoggedIn = val;
    });
  }

  login() {
    this.#isLoggedIn = true;
  }

  logout() {
    this.#isLoggedIn = false;
    Api.logout().then(() => this.#router.navigate(new URL('/', location.origin), true, false));
  }

  get isLoggedIn() {
    return this.#isLoggedIn;
  }
}
