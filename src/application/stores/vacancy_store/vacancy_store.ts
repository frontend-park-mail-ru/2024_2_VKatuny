import { Vacancy } from '@/application/models/vacancy';
import { Action } from '@/modules/store_manager/action';
import { Store } from '@/modules/store_manager/store';
import { UpdateActionPayload, VacancyActions } from './vacancy_actions';
import { storeManager } from '@/modules/store_manager/store_manager';
import { Applicant } from '@/application/models/applicant';

export interface VacancyData {
  vacancy?: Vacancy;
  loadedVacancy?: boolean;
  applied?: boolean;
  favorite?: boolean;
  appliers?: Array<Applicant>;
}

function vacancyStoreReducer(state: VacancyData, action: Action) {
  switch (action.type) {
    case VacancyActions.Update: {
      const payload = action.payload as UpdateActionPayload;
      state.vacancy = payload.vacancy;
      state.loadedVacancy = payload.loaded;
      state.appliers = payload.appliers;
      return state;
    }
    case VacancyActions.Apply: {
      if (state.vacancy) {
        state.applied = true;
      } else {
        state.applied = false;
      }
      return state;
    }
    case VacancyActions.ResetApply: {
      state.applied = false;
      return state;
    }

    case VacancyActions.AddToFavorite: {
      state.favorite = true;
      return state;
    }

    case VacancyActions.RemoveFromFavorite: {
      state.favorite = false;
      return state;
    }

    case VacancyActions.Clear: {
      return {};
    }
  }
  return state;
}

export const vacancyStore = new Store<VacancyData>({}, vacancyStoreReducer);

storeManager.addStore(vacancyStore);
