import { Component } from '@/modules/vdom/virtual_node';
import { NotFoundPage } from '@/application/pages/not_found_page/not_found_page';
import { VirtualDomRoot } from '@/modules/vdom/virtual_dom_root';

export interface PageClass {
  new (props: { url: URL }): Component;
}

export class ForbiddenPage extends Error {
  public redirectUrl: URL;
  constructor(redirectUrl: URL) {
    super('forbidden page');
    this.redirectUrl = redirectUrl;
    Object.setPrototypeOf(this, ForbiddenPage.prototype);
  }
}

export class NotFoundError extends Error {
  constructor() {
    super('resource not found');
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class Router {
  private routes: Map<string, PageClass>;
  private currentPage?: Component;
  private vdomRoot: VirtualDomRoot;

  constructor(rootNode: HTMLElement) {
    this.routes = new Map<string, PageClass>();
    this.vdomRoot = new VirtualDomRoot(rootNode);
  }

  addRoute(pathname: string, pageClass: PageClass) {
    this.routes.set(pathname, pageClass);
  }

  removeRoute(pathname: string): boolean {
    return this.routes.delete(pathname);
  }

  navigate(url: URL, redirection: boolean = false, modifyHistory: boolean = true) {
    try {
      if (modifyHistory) {
        if (!redirection) {
          history.pushState(null, '', url);
        } else {
          history.replaceState(null, '', url);
        }
      }
      const newPage = this.routes.has(url.pathname) ? this.routes.get(url.pathname) : NotFoundPage;
      this.replacePage(newPage, url);
    } catch (err) {
      if (err instanceof ForbiddenPage) {
        this.navigate(err.redirectUrl, true, true);
        return;
      }
      if (err instanceof NotFoundError) {
        this.replacePage(NotFoundPage, url);
        return;
      }
      throw err;
    }
  }

  private replacePage(newPageClass: PageClass, newPageUrl: URL) {
    this.vdomRoot.render({ type: newPageClass, props: { url: newPageUrl }, children: [] });
  }

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
