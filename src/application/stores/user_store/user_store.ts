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

export interface RegistrationFormData {
  userType?: FormValue;
  firstName?: FormValue;
  secondName?: FormValue;
  birthDate?: FormValue;
  email?: FormValue;
  password?: FormValue;
  passwordRepeat?: FormValue;
  position?: FormValue;
  companyName?: FormValue;
  companyDescription?: FormValue;
  website?: FormValue;
  isValid?: boolean;
  errorMsg?: string;
}

export interface LoginFormFields {
  userType?: UserType;
  email?: string;
  password?: string;
}

export interface RegistrationFormFields {
  firstName?: string;
  secondName?: string;
  birthDate?: string;
  email?: string;
  password?: string;
  passwordRepeat?: string;
  position?: string;
  companyName?: string;
  companyDescription?: string;
  website?: string;
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
  csrfToken?: string;
  userProfile?: Applicant | Employer;
  loginForm?: LoginFormData;
  registrationForm?: RegistrationFormData;
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
        csrfToken: payload.csrfToken,
      };
    }

    case UserActions.LoginFormSubmit: {
      const payload = action.payload as LoginFormData;
      state.loginForm = payload;
      return state;
    }

    case UserActions.RegistrationFormSubmit: {
      const payload = action.payload as RegistrationFormData;
      if (!state.registrationForm) {
        state.registrationForm = {};
      }
      Object.entries(payload).forEach(([key, value]) => {
        (state.registrationForm as { [key: string]: unknown })[key] = value;
      });
      return state;
    }

    case UserActions.UpdateProfile: {
      const payload = action.payload as Applicant | Employer;
      state.userProfile = payload;
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
