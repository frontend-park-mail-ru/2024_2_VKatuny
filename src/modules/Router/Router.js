import { Page } from '/src/modules/Page/Page.js';
import { PageNotFound } from '/src/modules/Page/PageNotFound.js';

const APP_ID = 'app';

/** Simple navigation router class. */
export class Router {
  #currentPage;
  #routes;

  /**
   * Create a router without any routes.
   */
  constructor() {
    this.#routes = new Map();
    this.#currentPage = undefined;
  }

  /**
   * Get current page instance
   * @returns {Page} Current page object
   */
  get currentPage() {
    return this.#currentPage;
  }

  /**
   * Add a route to router
   * @param {string} pathname - The string representation of URL pathname of the page to be added.
   * @param {Page} pageClass - A class of added page.
   * @throws {TypeError} - Any argument has incorrect type
   */
  addRoute(pathname, pageClass) {
    if (typeof pathname !== 'string') {
      throw TypeError('Pathname must be a string');
    }
    if (!(pageClass.prototype instanceof Page || pageClass === Page)) {
      throw TypeError('pageClass must be a child of Page');
    }
    this.#routes.set(pathname, pageClass);
  }

  /**
   * Remove a route from router
   * @param {string} pathname - The string representation of URL pathname of the page to be removed.
   * @throws {TypeError} - Any argument has incorrect type
   * @returns {boolean} Is route deleted.
   */
  removeRoute(pathname) {
    if (typeof pathname !== 'string') {
      throw TypeError('Pathname must be a string');
    }
    return this.#routes.delete(pathname);
  }

  /**
   * Navigate to the page with given url
   * @param {URL} url - The URL to navigate to
   * @param {boolean} redirection - Is this navigation a redirection
   * @param {boolean} modifyHistory - If true, browser history will be modified
   * @throws {TypeError} Invalid argument types
   */
  navigate(url, redirection = false, modifyHistory = true) {
    if (typeof redirection !== 'boolean') {
      throw TypeError('redirection must be a boolean');
    }
    if (typeof modifyHistory !== 'boolean') {
      throw TypeError('modifyHistory must be a boolean');
    }
    if (!(url instanceof URL)) {
      throw TypeError('url must be an instance of URL');
    }

    if (modifyHistory) {
      if (!redirection) {
        history.pushState(null, '', url);
      } else {
        history.replaceState(null, '', url);
      }
    }
    const app = document.getElementById(APP_ID);

    this.#currentPage = this.#routes.has(url.pathname)
      ? new (this.#routes.get(url.pathname))(url)
      : new PageNotFound(url);
    app.innerHTML = this.#currentPage.render();
  }

  /**
   * Start routing.
   */
  start() {
    window.addEventListener('popstate', (ev) => {
      ev.preventDefault();
      this.navigate(new URL(location.href), false, false);
    });

    window.addEventListener('click', (ev) => {
      let currentElement = ev.target;
      while (currentElement) {
        if (
          currentElement instanceof HTMLAnchorElement &&
          currentElement.origin === location.origin
        ) {
          ev.preventDefault();
          this.navigate(new URL(currentElement.href));
          break;
        }
        currentElement = currentElement.parentElement;
      }
    });

    this.navigate(new URL(location.href), false, false);
  }
}
