import { removeEventListeners } from '../Events/EventUtils.js';

export class Component {
  constructor({ renderParams = {}, templateName = '', existingElement = undefined }) {
    this._eventListeners = [];
    if (existingElement instanceof HTMLElement) {
      this._html = existingElement;
      return;
    }
    this._html = document.createElement('template');
    this._html.innerHTML = this.#renderStatic(templateName, renderParams);
    this._html = this._html.content.firstChild;
    this._html = document.adoptNode(this._html);

  }

  #renderStatic = function (templateName, renderParams) {
    return templateName ? Handlebars.templates[templateName](renderParams) : '';
  };

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
