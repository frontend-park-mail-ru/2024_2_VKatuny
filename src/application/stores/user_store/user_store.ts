import { Store } from '@/modules/store_manager/store';
import { Applicant } from '@application/models/applicant';
import { Employer } from '@application/models/employer';
import { storeManager } from '@/modules/store_manager/store_manager';
import { Action } from '@/modules/store_manager/action';
import { LoginActionPayload, UserActions } from './user_actions';
import { UserType } from '@/application/models/user-type';
import { FormValue } from '@/application/models/form_value';

export interface LoginFormData {
  userType: FormValue;
  email: FormValue;
  password: FormValue;
  isValid: boolean;
  errorMsg?: string;
}

const userTypeTranslation = new Map<UserType, string>([
  [UserType.Employer, 'Работодатель'],
  [UserType.Applicant, 'Соискатель'],
]);

export interface UserData {
  isLoggedIn: boolean;
  userType?: UserType;
  russianUserType?: string;
  id?: number;
  userProfile?: Applicant | Employer;
  loginForm?: LoginFormData;
}

function userStoreReducer(state: UserData, action: Action) {
  switch (action.type) {
    case UserActions.Logout: {
      return {
        isLoggedIn: false,
      } as UserData;
    }

    case UserActions.Login: {
      const payload = action.payload as LoginActionPayload;
      return {
        isLoggedIn: true,
        userType: payload.userType,
        russianUserType: userTypeTranslation.get(payload.userType),
        id: payload.id,
        userProfile: payload.userProfile,
        loginForm: state.loginForm,
      };
    }

    case UserActions.LoginFormSubmit: {
      const payload = action.payload as LoginFormData;
      state.loginForm = payload;
      return state;
    }
  }
  return state;
}

export const userStore = new Store<UserData>(
  {
    isLoggedIn: false,
  },
  userStoreReducer,
);

storeManager.addStore(userStore);
