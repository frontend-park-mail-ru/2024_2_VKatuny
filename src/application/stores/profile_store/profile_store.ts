import { Applicant } from '@/application/models/applicant';
import { Employer } from '@/application/models/employer';
import { FormValue } from '@/application/models/form_value';
import { Store } from '@/modules/store_manager/store';
import { Action } from '@/modules/store_manager/action';
import { UserType } from '@/application/models/user-type';
import { ProfileActions, UpdateProfilePayload } from './profile_actions';
import { storeManager } from '@/modules/store_manager/store_manager';
import { Vacancy } from '@/application/models/vacancy';
import { Cv } from '@/application/models/cv';

export interface ProfileFormData {
  firstName?: FormValue;
  secondName?: FormValue;
  birthDate?: FormValue;
  education?: FormValue;
  contacts?: FormValue;
  city?: FormValue;
  isValid?: boolean;
  errorMsg?: string;
}

export interface ProfileFormFields {
  firstName?: string;
  secondName?: string;
  birthDate?: string;
  city?: string;
  education?: string;
  contacts?: string;
}

export interface ProfileData {
  userType?: UserType;
  userProfile?: Applicant | Employer;
  profileLoaded?: boolean;
  profileForm?: ProfileFormData;
  vacancyList?: Vacancy[];
  cvList?: Cv[];
  favoriteVacancyList?: Vacancy[];
}

function profileStoreReducer(state: ProfileData, action: Action) {
  switch (action.type) {
    case ProfileActions.UpdateProfile: {
      const payload = action.payload as UpdateProfilePayload;
      state.userProfile = payload.userProfile;
      state.userType = payload.userType;
      state.profileLoaded = payload.profileLoaded;
      return state;
    }
    case ProfileActions.ProfileFormSubmit: {
      if (!state.profileForm) {
        state.profileForm = {};
      }
      const payload = action.payload as ProfileFormData;
      Object.entries(payload).forEach(([key, value]) => {
        (state.profileForm as { [key: string]: unknown })[key] = value;
      });
      return state;
    }
    case ProfileActions.ProfileFormReset: {
      delete state.profileForm;
      return state;
    }

    case ProfileActions.UpdateVacancyList: {
      const payload = action.payload as Vacancy[];
      state.vacancyList = payload;
      return state;
    }

    case ProfileActions.UpdateCvList: {
      const payload = action.payload as Cv[];
      state.cvList = payload;
      return state;
    }

    case ProfileActions.UpdateFavoriteVacancyList: {
      const payload = action.payload as Vacancy[];
      state.favoriteVacancyList = payload;
      return state;
    }
  }
  return state;
}

export const profileStore = new Store<ProfileData>({ profileLoaded: false }, profileStoreReducer);

storeManager.addStore(profileStore);
