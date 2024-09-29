import { Api } from '../Api/Api.js';

export class UserSession {
  #isLoggedIn;

  constructor() {
    this.#isLoggedIn = false;
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
    Api.logout();
  }

  get isLoggedIn() {
    return this.#isLoggedIn;
  }
}
