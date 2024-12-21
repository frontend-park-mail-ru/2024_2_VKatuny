import { getVacanciesFeed } from '@/modules/api/api';
import { backendStore } from '../stores/backend_store/backend_store';
import {
  FeedAction,
  Loadable,
  LoadFeedPayload,
  LoadMoreAction,
  LoadMoreActionPayload,
} from '../stores/feed_store/feed_actions';
import { makeVacancyFromApi } from '../models/vacancy';
import { storeManager } from '@/modules/store_manager/store_manager';
import { assertIfError } from '@/modules/common_utils/asserts/asserts';
import { feedStore } from '../stores/feed_store/feed_store';

export interface LoadFeedOptions {
  whatToLoad: Loadable;
  startFrom: number;
  searchQuery: string;
  searchBy: string;
  searchCategory: string;
  numToLoadAtOnce: number;
}

async function loadFeed(options: LoadFeedOptions) {
  const backendOrigin = backendStore.getData().backendOrigin;
  switch (options.whatToLoad) {
    case Loadable.Vacancies: {
      try {
        const rawVacancies = await getVacanciesFeed(backendOrigin, {
          offset: options.startFrom,
          num: options.numToLoadAtOnce,
          searchQuery: options.searchQuery,
          searchBy: options.searchBy,
          group: options.searchCategory,
        });
        const vacancies = rawVacancies.map((rawVacancy) => makeVacancyFromApi(rawVacancy));
        storeManager.dispatch({
          type: FeedAction.loadFeed,
          payload: {
            whatToLoad: options.whatToLoad,
            startFrom: options.startFrom,
            searchQuery: options.searchQuery,
            searchBy: options.searchBy,
            searchCategory: options.searchCategory,
            numToLoadAtOnce: options.numToLoadAtOnce,
          } as LoadFeedPayload,
        });
        storeManager.dispatch({
          type: FeedAction.loadMore,
          payload: { moreData: vacancies } as LoadMoreActionPayload,
        });
      } catch (err) {
        assertIfError(err);
        console.log(err);
      }
    }
  }
}

async function loadMore(options: { whatToLoad: Loadable }) {
  const backendOrigin = backendStore.getData().backendOrigin;
  try {
    switch (options.whatToLoad) {
      case Loadable.Vacancies: {
        const vacanciesData = feedStore.getData();
        const rawVacancies = await getVacanciesFeed(backendOrigin, {
          offset: vacanciesData.loadedData.length,
          num: vacanciesData.numToLoadAtOnce,
          searchQuery: vacanciesData.searchQuery,
          searchBy: vacanciesData.searchBy,
          group: vacanciesData.searchCategory,
        });
        const vacancies = rawVacancies.map((rawVacancy) => makeVacancyFromApi(rawVacancy));
        storeManager.dispatch({
          type: FeedAction.loadMore,
          payload: { moreData: vacancies },
        } as LoadMoreAction);
      }
    }
  } catch (err) {
    assertIfError(err);
    console.log(err);
  }
}

function clearFeed() {
  storeManager.dispatch({
    type: FeedAction.clearFeed,
  });
}

export const feedActionCreators = {
  loadFeed,
  loadMore,
  clearFeed,
};
