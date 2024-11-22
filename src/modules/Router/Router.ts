import { Page } from '@/modules/Page/Page';
import { NotFoundPage } from '@/Pages/NotFoundPage/NotFoundPage';

interface IPage {
  new ({ url }: { url: URL }): Page;
}

const APP_ID = 'app';

export class ForbiddenPage extends Error {
  public redirectUrl: URL;
  constructor(redirectUrl: URL) {
    super('forbidden page');
    this.redirectUrl = new URL(redirectUrl);
  }
}

export class NotFoundError extends Error {
  constructor() {
    super('resource not found');
  }
}

/** Simple navigation router class. */
export class Router {
  private currentPage: Page | undefined;
  private routes: Map<string, IPage>;

  /**
   * Create a router without any routes.
   */
  constructor() {
    this.routes = new Map<string, IPage>();
    this.currentPage = undefined;
  }

  /**
   * Get current page instance
   * @returns {Page} Current page object
   */
  getCurrentPage(): Page {
    return this.currentPage;
  }

  /**
   * Add a route to router
   * @param {string} pathname - The string representation of URL pathname of the page to be added.
   * @param {Page} pageClass - A class of added page.
   */
  addRoute(pathname: string, pageClass: IPage) {
    this.routes.set(pathname, pageClass);
  }

  /**
   * Remove a route from router
   * @param {string} pathname - The string representation of URL pathname of the page to be removed.
   * @returns {boolean} Is route deleted.
   */
  removeRoute(pathname: string): boolean {
    return this.routes.delete(pathname);
  }

  /**
   * Navigate to the page with given url
   * @param {URL} url - The URL to navigate to
   * @param {boolean} redirection - Is this navigation a redirection
   * @param {boolean} modifyHistory - If true, browser history will be modified
   * @throws {TypeError} Invalid argument types
   */
  async navigate(url: URL, redirection: boolean = false, modifyHistory: boolean = true) {
    try {
      if (modifyHistory) {
        if (!redirection) {
          history.pushState(null, '', url);
        } else {
          history.replaceState(null, '', url);
        }
      }

      const newPage = this.routes.has(url.pathname) ? this.routes.get(url.pathname) : NotFoundPage;
      await this._replacePage(newPage, url);
    } catch (err) {
      if (err instanceof ForbiddenPage) {
        this.navigate(err.redirectUrl, true, true);
        return;
      }
      if (err instanceof NotFoundError) {
        this._replacePage(NotFoundPage, url);
        return;
      }
      throw err;
    }
  }

  // TODO: remove any here (after all code in typescript)
  // eslint-disable-next-line
  async _replacePage(newPageClass: any, newPageUrl: URL) {
    if (this.currentPage) {
      this.currentPage.cleanup();
    }
    this.currentPage = new newPageClass({ url: newPageUrl });
    const app = document.getElementById(APP_ID);
    app.innerHTML = '';
    app.appendChild(this.currentPage.render());
    this.currentPage.postRenderInit();
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
      let currentElement = ev.target as HTMLElement;
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

export default new Router();
