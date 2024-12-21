import { Action } from '@/modules/store_manager/action';
import { FeedAction, Loadable, LoadFeedPayload, LoadMoreActionPayload } from './feed_actions';
import { Store } from '@/modules/store_manager/store';
import { storeManager } from '@/modules/store_manager/store_manager';

export interface FeedStoreData {
  contentType?: Loadable;
  loadedData?: Array<unknown>;
  startFrom?: number;
  numToLoadAtOnce?: number;
  searchQuery?: string;
  searchBy?: string;
  searchCategory?: string;
}

function feedStoreReducer(state: FeedStoreData, action: Action) {
  switch (action.type) {
    case FeedAction.loadFeed: {
      const payload = action.payload as LoadFeedPayload;
      return {
        contentType: payload.whatToLoad,
        loadedData: [] as Array<unknown>,
        startFrom: payload.startFrom,
        numToLoadAtOnce: payload.numToLoadAtOnce,
        searchQuery: payload.searchQuery,
        searchBy: payload.searchBy,
        searchCategory: payload.searchCategory,
      };
    }

    case FeedAction.loadMore: {
      const payload = action.payload as LoadMoreActionPayload;
      if (!state.loadedData) {
        state.loadedData = [];
      }
      state.loadedData.push(...payload.moreData);
      return state;
    }

    case FeedAction.clearFeed: {
      return {};
    }

    default:
      return state;
  }
}

export const feedStore = new Store<FeedStoreData>({}, feedStoreReducer);

storeManager.addStore(feedStore);
