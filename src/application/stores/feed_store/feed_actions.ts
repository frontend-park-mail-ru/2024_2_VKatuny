/** @fileoverview This file contains actions for feed store */

export enum FeedAction {
  loadFeed = 'loadFeed',
  loadMore = 'loadMore',
  clearFeed = 'clearFeed',
}

export enum Loadable {
  Vacancies = 'vacancies',
}

export interface LoadFeedPayload {
  whatToLoad: Loadable;
  startFrom: number;
  numToLoadAtOnce: number;
  searchQuery?: string;
  searchBy?: string;
  searchCategory?: string;
}

export interface LoadFeedAction {
  type: FeedAction.loadFeed;
  payload: LoadFeedPayload;
}

export interface LoadMoreActionPayload {
  moreData: Array<unknown>;
}

export interface LoadMoreAction {
  type: FeedAction.loadMore;
  payload: LoadMoreActionPayload;
}

export interface ClearFeedAction {
  type: FeedAction.clearFeed;
}
