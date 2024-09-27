import { Page } from './Page.js';

/** A class representing 404 not found page.
 * @extends Page
 */
export class PageNotFound extends Page {
  /**
   * Create an instance of 404 Page.
   * @param {URL} url --- a URL object containing the link with which this page were navigated
   * @throws {TypeError} url is not an instance of URL
   */
  constructor(url) {
    super(url);
  }

  /**
   * Render this page.
   * @returns {string} HTML representation of the page
   */
  render() {
    return `<div>${this._url} Not Found (404)</div>`;
  }
}
