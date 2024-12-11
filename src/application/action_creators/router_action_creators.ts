import {
  RouterActions,
  PageClass,
  RemoveRouteAction,
  RemoveRouteActionPayload,
  NavigationActionPayload,
  RedirectAction,
  NavigateAction,
  StartAction,
} from '@/application/stores/router_store/router_actions';
import { storeManager } from '@/modules/store_manager/store_manager';
import {
  AddRouteAction,
  AddRouteActionPayload,
} from '@/application/stores/router_store/router_actions';

function addRoute(url: URL, page: PageClass) {
  storeManager.dispatch({
    type: RouterActions.AddRoute,
    payload: {
      url,
      page,
    } as AddRouteActionPayload,
  } as AddRouteAction);
}

function removeRoute(url: URL) {
  storeManager.dispatch({
    type: RouterActions.RemoveRoute,
    payload: {
      url,
    } as RemoveRouteActionPayload,
  } as RemoveRouteAction);
}

function redirect(url: URL) {
  storeManager.dispatch({
    type: RouterActions.Redirect,
    payload: {
      url,
    } as NavigationActionPayload,
  } as RedirectAction);
}

function navigate(url: URL) {
  storeManager.dispatch({
    type: RouterActions.Navigate,
    payload: {
      url,
    } as NavigationActionPayload,
  } as NavigateAction);
}

function startRouting(url: URL) {
  storeManager.dispatch({
    type: RouterActions.Start,
    payload: {
      url,
    } as NavigationActionPayload,
  } as StartAction);
}

export const routerActionCreators = {
  addRoute,
  removeRoute,
  redirect,
  navigate,
  startRouting,
};
