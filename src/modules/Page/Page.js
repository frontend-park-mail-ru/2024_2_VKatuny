import { removeEventListeners } from '../Events/EventUtils.js';

/** Base class representing browser page */
export class Page {
  /**
   *
   * @param {URL} url --- a URL object containing the link with which this page were navigated
   * @throws {TypeError} url is not an instance of URL
   */
  constructor({ url }) {
    if (!(url instanceof URL)) {
      throw TypeError('url must be a URL instance');
    }
    this._url = url;
    this._eventListeners = [];
  }

  postRenderInit() {}

  render() {
    return '';
  }

  cleanup() {
    removeEventListeners(this._eventListeners);
  }
}
