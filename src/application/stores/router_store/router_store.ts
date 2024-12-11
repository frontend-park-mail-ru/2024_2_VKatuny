import { Store } from '@/modules/store_manager/store';
import { storeManager } from '@/modules/store_manager/store_manager';
import {
  RouterActions,
  AddRouteAction,
  RemoveRouteAction,
  NavigationActionPayload,
} from './router_actions';
import { Action } from '@/modules/store_manager/action';
import { NotFoundPage } from '@/application/pages/not_found_page/not_found_page';
import { PageClass } from './router_actions';

export enum PageSwitchStatus {
  Navigate = 'navigate',
  Redirect = 'redirect',
}

export interface RouterData {
  currentPage?: PageClass;
  currentUrl?: URL;
  switchStatus: PageSwitchStatus;
  modifyHistory: boolean;
  possiblePages: Map<string, PageClass>;
  fallbackPage: PageClass;
}

function routerStoreReducer(curData: RouterData, action?: Action): RouterData {
  switch (action.type) {
    case RouterActions.Navigate:
    case RouterActions.Redirect: {
      return switchPageReducer(curData, action, true);
    }
    case RouterActions.AddRoute: {
      const addRouteAction = action as AddRouteAction;
      curData.possiblePages.set(addRouteAction.payload.url.pathname, addRouteAction.payload.page);
      break;
    }
    case RouterActions.RemoveRoute: {
      const removeRouteAction = action as RemoveRouteAction;
      curData.possiblePages.delete(removeRouteAction.payload.url.pathname);
      break;
    }
    case RouterActions.Start: {
      return switchPageReducer(curData, action, false);
    }
  }
  return curData;
}

function switchPageReducer(data: RouterData, action: Action, modifyHistory: boolean = true) {
  const navData = action.payload as NavigationActionPayload;
  data.currentUrl = navData.url;
  data.currentPage = data.possiblePages.has(navData.url.pathname)
    ? data.possiblePages.get(navData.url.pathname)
    : data.fallbackPage;
  data.switchStatus =
    action.type === RouterActions.Navigate ? PageSwitchStatus.Navigate : PageSwitchStatus.Redirect;
  data.modifyHistory = modifyHistory;
  return data;
}

export const routerStore = new Store<RouterData>(
  {
    fallbackPage: NotFoundPage,
    possiblePages: new Map(),
    switchStatus: PageSwitchStatus.Navigate,
    currentUrl: new URL(window.location.href),
    modifyHistory: false,
  },
  routerStoreReducer,
);

storeManager.addStore(routerStore);
