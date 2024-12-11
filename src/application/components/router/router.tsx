import { Component, VirtualNodeSpec } from '@/modules/vdom/virtual_node';
import * as vdom from '@/modules/vdom/virtual_dom';
import { routerStore } from '@/application/stores/router_store/router_store';
import { PageClass } from '@/application/stores/router_store/router_actions';
import { PageSwitchStatus } from '@/application/stores/router_store/router_store';
import { routerActionCreators } from '@/application/action_creators/router_action_creators';

export class Router extends Component {
  private prevPage?: PageClass;

  didMount() {
    window.addEventListener('popstate', (ev) => {
      ev.preventDefault();
      routerActionCreators.navigate(new URL(location.href));
    });

    window.addEventListener('click', (ev) => {
      let currentElement = ev.target as HTMLElement;
      while (currentElement) {
        if (
          currentElement instanceof HTMLAnchorElement &&
          currentElement.origin === location.origin
        ) {
          ev.preventDefault();
          routerActionCreators.navigate(new URL(currentElement.href));
          break;
        }
        currentElement = currentElement.parentElement;
      }
    });
  }

  render(): VirtualNodeSpec {
    const routerData = routerStore.getData();
    const { currentUrl, switchStatus } = routerData;
    const CurrentPage = routerData.currentPage;
    if (this.prevPage !== CurrentPage) {
      this.prevPage = CurrentPage;
      if (switchStatus === PageSwitchStatus.Navigate) {
        history.pushState(null, '', currentUrl);
      } else {
        history.replaceState(null, '', currentUrl);
      }
    }
    return <CurrentPage url={currentUrl} key={CurrentPage.name} />;
  }
}
