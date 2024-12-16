/** @fileoverview This file contains actions for router store */

import type { Action } from '@/modules/store_manager/action';
import { Component } from '@/modules/vdom/virtual_node';

export interface PageClass {
  new (props: { url: URL }): Component;
}

/** Enum describing possible router actions */
export enum RouterActions {
  Navigate = 'navigate',
  Redirect = 'redirect',
  AddRoute = 'add_route',
  RemoveRoute = 'remove_route',
  Start = 'start',
  Switched = 'switched',
}

/** Payload for navigate and redirect actions */
export interface NavigationActionPayload {
  /** URL to navigate to */
  url: URL;
  modifyHistory?: boolean;
}

/** Payload for add route action */
export interface AddRouteActionPayload {
  /** URL to assign */
  url: URL;
  /** Page component */
  page: PageClass;
}

/** Payload for remove route action */
export interface RemoveRouteActionPayload {
  /** URL to remove */
  url: URL;
}

/** Navigate action. It symbolizes standard page navigation */
export interface NavigateAction extends Action {
  type: RouterActions.Navigate;
  payload: NavigationActionPayload;
}

/** Redirect action. It symbolizes redirection to another page */
export interface RedirectAction extends Action {
  type: RouterActions.Redirect;
  payload: NavigationActionPayload;
}

/** Action used to add new route in router */
export interface AddRouteAction extends Action {
  type: RouterActions.AddRoute;
  payload: AddRouteActionPayload;
}

/** Action used to remove route from router */
export interface RemoveRouteAction extends Action {
  type: RouterActions.RemoveRoute;
  payload: RemoveRouteActionPayload;
}

/** Action used to start routing */
export interface StartAction extends Action {
  type: RouterActions.Start;
  payload: NavigationActionPayload;
}
