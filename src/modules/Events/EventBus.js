class EventBus {
  #listeners;

  constructor() {
    this.#listeners = new Map();
  }

  on(event, callback) {
    if (this.#listeners.has(event)) {
      this.#listeners.get(event).add(callback);
    } else {
      this.#listeners.set(event, new Set([callback]));
    }
  }

  off(event, callback) {
    return this.#listeners.has(event) && this.#listeners.get(event).delete(callback);
  }

  emit(eventName, eventData) {
    console.log({ eventName, eventData });
    if (this.#listeners.has(eventName)) {
      const callbacks = this.#listeners.get(eventName);
      callbacks.forEach((callback) => {
        try {
          callback(eventData);
        } catch (err) {
          console.log(err);
        }
      });
    }
  }
}

export default new EventBus();
