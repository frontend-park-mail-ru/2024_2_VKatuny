import { Vacancy } from '@/application/models/vacancy';
import { Action } from '@/modules/store_manager/action';
import { Store } from '@/modules/store_manager/store';
import { UpdateActionPayload, VacancyActions } from './vacancy_actions';
import { storeManager } from '@/modules/store_manager/store_manager';
import { Applicant } from '@/application/models/applicant';
import { FormValue } from '@/application/models/form_value';

export interface VacancyData {
  vacancy?: Vacancy;
  loadedVacancy?: boolean;
  applied?: boolean;
  favorite?: boolean;
  appliers?: Array<Applicant>;
  vacancyFormData?: VacancyFormData;
}

export interface VacancyFormData {
  position?: FormValue;
  salary?: FormValue;
  workType?: FormValue;
  location?: FormValue;
  description?: FormValue;
  positionGroup?: FormValue;
  isValid?: boolean;
  errorMsg?: string;
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

    case VacancyActions.FormSubmit: {
      const payload = action.payload as VacancyFormData;
      if (!state.vacancyFormData) {
        state.vacancyFormData = {};
      }
      Object.entries(payload).forEach(([key, value]) => {
        (state.vacancyFormData as { [key: string]: unknown })[key] = value;
      });
      return state;
    }
  }
  return state;
}

export const vacancyStore = new Store<VacancyData>({}, vacancyStoreReducer);

storeManager.addStore(vacancyStore);
