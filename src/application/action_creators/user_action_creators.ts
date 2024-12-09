import {
  UserActions,
  LoginAction,
  LogoutAction,
} from '@application/stores/user_store/user_actions';
import { userStore } from '@application/stores/user_store/user_store';
import {
  login as apiLogin,
  logout as apiLogout,
  registerApplicant as apiRegisterApplicant,
  registerEmployer as apiRegisterEmployer,
  getEmployer,
  getApplicant,
} from '@api/api';
import type {
  registerApplicantOptions,
  registerEmployerOptions,
} from '@/modules/api/src/handlers/auth/register';
import { backendStore } from '@application/stores/backend_store/backend_store';
import { LoginOptions } from '@api/src/handlers/auth/login';
import { UserType } from '@application/models/user-type';
import { makeApplicantFromApi } from '../models/applicant';
import { makeEmployerFromApi } from '../models/employer';
import type { Applicant as ApiApplicant } from '@api/src/responses/applicant';
import type { Employer as ApiEmployer } from '@api/src/responses/employer';
import { assertIfError } from '@/modules/common_utils/asserts/asserts';

async function login({ userType, email, password }: LoginOptions) {
  const backendOrigin = backendStore.getData().backendOrigin;
  try {
    const loginResponse = await apiLogin(backendOrigin, {
      userType,
      email,
      password,
    });
    const userProfile = await getUser(backendOrigin, userType, loginResponse.id);
    userStore.dispatch({
      type: UserActions.Login,
      payload: {
        email,
        userType,
        userProfile,
      },
    } as LoginAction);
  } catch (err) {
    assertIfError(err);
    userStore.dispatch({
      type: UserActions.Logout,
    } as LogoutAction);
  }
}

async function getUser(backendOrigin: URL, userType: UserType, id: number) {
  return userType === UserType.Applicant
    ? makeApplicantFromApi((await getApplicant(backendOrigin, id)) as ApiApplicant)
    : makeEmployerFromApi((await getEmployer(backendOrigin, id)) as ApiEmployer);
}

async function logout() {
  const backendOrigin = backendStore.getData().backendOrigin;
  try {
    await apiLogout(backendOrigin);
    userStore.dispatch({
      type: UserActions.Logout,
    } as LogoutAction);
  } catch {}
}

async function register(
  userType: UserType,
  body: registerApplicantOptions | registerEmployerOptions,
) {
  const backendOrigin = backendStore.getData().backendOrigin;
  try {
    const response =
      userType === UserType.Applicant
        ? await apiRegisterApplicant(backendOrigin, body as registerApplicantOptions)
        : await apiRegisterEmployer(backendOrigin, body as registerEmployerOptions);
    const userProfile = await getUser(backendOrigin, userType, response.id);
    userStore.dispatch({
      type: UserActions.Login,
      payload: {
        email: body.email,
        userType,
        userProfile,
      },
    });
  } catch {
    userStore.dispatch({
      type: UserActions.Logout,
    });
  }
}

export const userActionCreators = {
  login,
  logout,
  register,
};
