import { UserSession } from '@/modules/UserSession/UserSession';

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
