import { Component, VirtualNodeSpec } from '@/modules/vdom/virtual_node';
import * as vdom from '@/modules/vdom/virtual_dom';
import { routerStore } from '@/application/stores/router_store/router_store';
import { RouterActions } from '@/application/stores/router_store/router_actions';
import { PageSwitchStatus } from '@/application/stores/router_store/router_store';
import { routerActionCreators } from '@/application/action_creators/router_action_creators';
import { storeManager } from '@/modules/store_manager/store_manager';

export class Router extends Component {
  didCreate() {
    super.didCreate();
    window.addEventListener('popstate', (ev) => {
      ev.preventDefault();
      routerActionCreators.navigate(new URL(location.href), false);
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
    if (routerData.switchStatus !== PageSwitchStatus.Switched) {
      if (switchStatus === PageSwitchStatus.Navigate) {
        history.pushState(null, '', currentUrl);
      } else {
        history.replaceState(null, '', currentUrl);
      }
      storeManager.dispatch({
        type: RouterActions.Switched,
      });
    }
    return <CurrentPage url={currentUrl} key={CurrentPage.name} />;
  }
}
