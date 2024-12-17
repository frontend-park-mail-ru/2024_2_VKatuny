// import { Action } from '@/modules/store_manager/action';
// import { FeedAction, Loadable, LoadFeedPayload } from './feed_actions';

// export interface FeedStoreData {
//   contentType?: Loadable;
//   loadedData?: Array<unknown>;
//   startFrom?: number;
//   numToLoadAtOnce?: number;
//   searchQuery?: string;
//   searchBy?: string;
//   searchCategory?: string;
// }

// function feedStoreReducer(state: FeedStoreData, action: Action) {
//   switch (action.type) {
//     case FeedAction.loadFeed: {
//       const payload = action.payload as LoadFeedPayload;
//       return {
//         contentType: payload.whatToLoad,
//         loadedData: [] as Array<unknown>,
//         startFrom: payload.startFrom,
//         numToLoadAtOnce: payload.numToLoadAtOnce,
//         searchQuery: payload.searchQuery,
//         searchBy: payload.searchBy,
//         searchCategory: payload.searchCategory,
//       };
//     }
//     case FeedAction.loadMore: {
//     }
//   }
// }
