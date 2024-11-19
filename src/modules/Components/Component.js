import { removeEventListeners } from '@/modules/Events/EventUtils';
import eventBus from '@/modules/Events/EventBus';

export class ComponentView {
  constructor({ renderParams = {}, template, existingElement = undefined }) {
    this._eventListeners = [];
    if (existingElement instanceof HTMLElement) {
      this._html = existingElement;
      return;
    }
    this._html = document.createElement('template');
    this._html.innerHTML = template(renderParams);
    this._html = this._html.content.firstChild;
    this._html = document.adoptNode(this._html);
  }

  /**
   * Render this component
   * @returns HTML representation of the page
   */
  render() {
    return this._html;
  }

  cleanup() {
    removeEventListeners(this._eventListeners);
  }
}

export class ComponentController {
  #eventHandlers;
  constructor(model, view, component) {
    this.#eventHandlers = [];
    this._model = model;
    this._view = view;
    this._component = component;
  }

  setHandlers(events) {
    events.forEach(({ event, handler }) => {
      eventBus.on(event, handler);
      this.#eventHandlers.push({ event, handler });
    });
  }

  clearAllHandlers() {
    this.#eventHandlers.forEach(({ event, handler }) => {
      eventBus.off(event, handler);
    });
  }

  cleanup() {
    this.clearAllHandlers();
    this._model.cleanup();
    this._view.cleanup();
  }
}

export class ComponentModel {
  cleanup() {}
}

export class Component {
  constructor({
    modelClass,
    modelParams = {},
    viewClass,
    viewParams = {},
    existingElement,
    controllerClass,
    controllerParams = {},
  }) {
    this._model = new modelClass(modelParams);
    this._view = new viewClass(viewParams, existingElement);
    this._controller = new controllerClass(this._model, this._view, this, controllerParams);
    this._children = [];
  }

  get model() {
    return this._model;
  }

  get view() {
    return this._view;
  }

  get controller() {
    return this._controller;
  }

  render() {
    return this._view.render();
  }

  cleanup() {
    this._children.forEach((child) => {
      child.cleanup();
    });
    this._controller.cleanup();
    this._model.cleanup();
    this._view.cleanup();
  }
}
