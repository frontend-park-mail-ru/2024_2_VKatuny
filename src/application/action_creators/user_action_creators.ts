import {
  UserActions,
  LoginAction,
  LogoutAction,
} from '@application/stores/user_store/user_actions';
import { LoginFormData } from '@application/stores/user_store/user_store';
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
import { validateEmail, validateOk } from '../validators/validators';
import { storeManager } from '@/modules/store_manager/store_manager';

function validateLoginData({ userType, email, password }: LoginOptions): LoginFormData {
  const isValid = [userType, email, password].every((field) => field !== '');
  const validatedData = {
    userType: validateOk(userType),
    email: validateEmail(email),
    password: validateOk(password),
    isValid,
    errorMsg: isValid ? '' : 'Заполните обязательные поля',
  };
  validatedData.isValid =
    validatedData.isValid &&
    [validatedData.userType, validatedData.email, validatedData.password].every(
      (field) => field.isValid,
    );
  return validatedData;
}

async function login({ userType, email, password }: LoginOptions) {
  const validatedLoginData = validateLoginData({ userType, email, password });
  if (!validatedLoginData.isValid) {
    storeManager.dispatch({
      type: UserActions.LoginFormSubmit,
      payload: validatedLoginData,
    });
    return;
  }

  const backendOrigin = backendStore.getData().backendOrigin;
  try {
    const loginResponse = await apiLogin(backendOrigin, {
      userType,
      email,
      password,
    });
    const userProfile = await getUser(backendOrigin, userType, loginResponse.id);
    storeManager.dispatch({
      type: UserActions.Login,
      payload: {
        email,
        userType,
        userProfile,
      },
    } as LoginAction);
  } catch (err) {
    assertIfError(err);
    storeManager.dispatch({
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
    storeManager.dispatch({
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
    storeManager.dispatch({
      type: UserActions.Login,
      payload: {
        email: body.email,
        userType,
        userProfile,
      },
    });
  } catch {
    storeManager.dispatch({
      type: UserActions.Logout,
    });
  }
}

export const userActionCreators = {
  login,
  logout,
  register,
};
