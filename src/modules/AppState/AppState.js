import { UserSession } from '@/modules/UserSession/UserSession';
import backendConfig from '@/config/backend.json';

class AppState {
  #userSession;
  #backendUrl;
  constructor({ backendUrl }) {
    this.#backendUrl = backendUrl;
    this.#userSession = new UserSession(this.#backendUrl);
  }

  get userSession() {
    return this.#userSession;
  }

  get backendUrl() {
    return this.#backendUrl;
  }
}

export default new AppState({ backendUrl: new URL(backendConfig.backendPrefix) });
