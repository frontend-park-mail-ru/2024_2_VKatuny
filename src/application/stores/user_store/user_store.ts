import { Store } from '@/modules/store_manager/store';
import { Applicant } from '@application/models/applicant';
import { Employer } from '@application/models/employer';
import { storeManager } from '@/modules/store_manager/store_manager';
import { Action } from '@/modules/store_manager/action';
import { LoginActionPayload, UserActions } from './user_actions';
import { UserType } from '@/application/models/user-type';

export interface UserData {
  isLoggedIn: boolean;
  userType?: UserType;
  email?: string;
  userProfile?: Applicant | Employer;
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
        email: payload.email,
        userProfile: payload.userProfile,
      };
    }
  }
}

export const userStore = new Store<UserData>(
  {
    isLoggedIn: false,
  },
  userStoreReducer,
);

storeManager.addStore(userStore);
