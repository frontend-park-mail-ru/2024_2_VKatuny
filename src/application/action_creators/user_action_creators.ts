import {
  UserActions,
  LoginAction,
  LogoutAction,
  LoginActionPayload,
} from '@application/stores/user_store/user_actions';
import {
  LoginFormData,
  RegistrationFormData,
  RegistrationFormFields,
  LoginFormFields,
  userStore,
} from '@application/stores/user_store/user_store';
import {
  login as apiLogin,
  logout as apiLogout,
  registerApplicant as apiRegisterApplicant,
  registerEmployer as apiRegisterEmployer,
  getUserAuthenticationStatus,
} from '@api/api';
import type {
  registerApplicantOptions,
  registerEmployerOptions,
} from '@/modules/api/src/handlers/auth/register';
import { backendStore } from '@application/stores/backend_store/backend_store';
import { UserType } from '@application/models/user-type';
import { Applicant } from '../models/applicant';
import { Employer } from '../models/employer';
import { assertIfError } from '@/modules/common_utils/asserts/asserts';
import {
  validateDateOfBirth,
  validateEmail,
  validateOk,
  validatePassword,
  validateRequired,
} from '../validators/validators';
import { storeManager } from '@/modules/store_manager/store_manager';
import { FormValue } from '@/application/models/form_value';
import { getUser } from '@/application/models/utils/get_user';

function validateLoginData({ userType, email, password }: LoginFormFields): LoginFormData {
  const isValid = [userType, email, password].every((field) => field.trim() !== '');
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

const regFieldsValidators = new Map(
  Object.entries({
    firstName: validateRequired,
    secondName: validateRequired,
    birthDate: validateDateOfBirth,
    email: validateEmail,
    password: validatePassword,
    passwordRepeat: validateRequired,
    position: validateRequired,
    companyName: validateRequired,
    companyDescription: validateOk,
    website: validateRequired,
  }),
);

function submitRegistrationFields(data: RegistrationFormFields) {
  const validatedData: RegistrationFormData = {};
  Object.entries(data).forEach(([key, value]) => {
    (validatedData as { [key: string]: FormValue })[key] = regFieldsValidators.get(key)(value);
  });
  storeManager.dispatch({
    type: UserActions.RegistrationFormSubmit,
    payload: validatedData,
  });
}

function updateProfile(newProfile: Applicant | Employer) {
  storeManager.dispatch({
    type: UserActions.UpdateProfile,
    payload: newProfile,
  });
}

async function login({ userType, email, password }: LoginFormFields) {
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
    await apiLogin(backendOrigin, {
      userType,
      email,
      password,
    });
    isAuthorized();
  } catch (err) {
    console.log(err);
    assertIfError(err);
    storeManager.dispatch({
      type: UserActions.Logout,
    } as LogoutAction);
  }
}

async function isAuthorized() {
  const backendOrigin = backendStore.getData().backendOrigin;
  try {
    const response = await getUserAuthenticationStatus(backendOrigin);
    const userProfile = await getUser(backendOrigin, response.userType, response.id);
    storeManager.dispatch({
      type: UserActions.Login,
      payload: {
        id: response.id,
        userType: response.userType,
        csrfToken: response.token,
        userProfile,
      } as LoginActionPayload,
    } as LoginAction);
  } catch {
    storeManager.dispatch({
      type: UserActions.Logout,
    } as LogoutAction);
  }
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

async function register(userType: UserType, body: RegistrationFormFields) {
  submitRegistrationFields(body as RegistrationFormFields);
  const validatedForm = userStore.getData().registrationForm;
  let isValid = false;
  if (userType === UserType.Applicant) {
    const { firstName, secondName, birthDate, email, password } = validatedForm;
    isValid = [firstName, secondName, birthDate, email, password].every((field) => field.isValid);
  } else {
    const {
      firstName,
      secondName,
      email,
      password,
      passwordRepeat,
      position,
      companyName,
      companyDescription,
      website,
    } = validatedForm;
    isValid = [
      firstName,
      secondName,
      email,
      password,
      passwordRepeat,
      position,
      companyName,
      companyDescription,
      website,
    ].every((field) => field.isValid);
  }
  if (!isValid) {
    storeManager.dispatch({
      type: UserActions.RegistrationFormSubmit,
      payload: {
        isValid,
      } as RegistrationFormData,
    });
    return;
  }
  isValid = body.passwordRepeat === body.password;
  if (!isValid) {
    storeManager.dispatch({
      type: UserActions.RegistrationFormSubmit,
      payload: {
        passwordRepeat: {
          value: '',
          isValid: false,
        },
        isValid,
        errorMsg: 'Пароли не совпадают',
      } as RegistrationFormData,
    });
    return;
  }

  const backendOrigin = backendStore.getData().backendOrigin;
  try {
    if (userType === UserType.Applicant) {
      await apiRegisterApplicant(backendOrigin, {
        firstName: body.firstName,
        secondName: body.secondName,
        birthDate: new Date(body.birthDate),
        email: body.email,
        password: body.password,
      } as registerApplicantOptions);
    } else {
      await apiRegisterEmployer(backendOrigin, {
        firstName: body.firstName,
        secondName: body.secondName,
        email: body.email,
        position: body.position,
        companyName: body.companyName,
        companyDescription: body.companyDescription,
        companyWebsite: body.website,
        password: body.password,
      } as registerEmployerOptions);
    }
    isAuthorized();
  } catch {
    storeManager.dispatch({
      type: UserActions.Logout,
    });
  }
}

export const userActionCreators = {
  isAuthorized,
  login,
  logout,
  register,
  submitRegistrationFields,
  updateProfile,
};
