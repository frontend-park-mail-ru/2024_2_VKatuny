import { UserSession } from '../UserSession/UserSession.js';

class AppState {
  #userSession;
  constructor() {
    this.#userSession = new UserSession();
  }

  get userSession() {
    return this.#userSession;
  }
}

export default new AppState();
