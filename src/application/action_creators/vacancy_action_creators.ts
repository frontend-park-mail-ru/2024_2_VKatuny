import { storeManager } from '@/modules/store_manager/store_manager';
import { backendStore } from '../stores/backend_store/backend_store';
import {
  ClearAction,
  UpdateAction,
  UpdateActionPayload,
  VacancyActions,
  VacancyFormSubmitAction,
} from '../stores/vacancy_store/vacancy_actions';
import { makeVacancyFromApi } from '../models/vacancy';
import {
  applyToVacancy,
  deleteVacancy,
  getVacancy,
  getVacancyAppliers,
  getVacancyApplyStatus,
  addVacancyToFavorites,
  getApplicantFavoriteVacancies,
  removeVacancyFromFavorites,
  resetApplyToVacancy,
  createVacancy as apiCreateVacancy,
  updateVacancy as apiUpdateVacancy,
} from '@/modules/api/api';
import { assertIfError } from '@/modules/common_utils/asserts/asserts';
import { Application } from '@/modules/api/src/responses/application';
import { makeApplicantFromApi } from '../models/applicant';
import { userStore } from '../stores/user_store/user_store';
import { UserType } from '../models/user-type';
import { Applicant } from '../models/applicant';
import {
  validateNumeric,
  validateOk,
  validateRequired,
  validatorTrain,
} from '../validators/validators';
import { FormValue } from '../models/form_value';
import { VacancyFormData, vacancyStore } from '../stores/vacancy_store/vacancy_store';
import { notificationActionCreators } from './notification_action_creators';
import { NotificationStyle, NotificationTimeouts } from '../models/notification';
import { catch_standard_api_errors } from '../utils/catch_standard_api_errors';

export interface VacancyFormFields {
  position?: string;
  salary?: string;
  workType?: string;
  location?: string;
  description?: string;
  positionGroup?: string;
}

const vacancyFormValidators = new Map(
  Object.entries({
    position: validateRequired,
    salary: validatorTrain(validateRequired, validateNumeric),
    workType: validateRequired,
    location: validateRequired,
    description: validateRequired,
    positionGroup: validateOk,
  }),
);

function submitVacancyFields(data: VacancyFormFields) {
  const validatedData: VacancyFormData = {};
  Object.entries(data).forEach(([key, value]) => {
    (validatedData as { [key: string]: FormValue })[key] = vacancyFormValidators.get(key)(value);
  });
  storeManager.dispatch({
    type: VacancyActions.FormSubmit,
    payload: validatedData,
  } as VacancyFormSubmitAction);
}

function validateVacancyForm(data: VacancyFormFields) {
  submitVacancyFields(data);
  let isValid = false;
  const userData = userStore.getData();
  if (userData.userType !== UserType.Employer) {
    return false;
  }
  const { position, salary, workType, location, description } =
    vacancyStore.getData().vacancyFormData;
  isValid = [position, salary, workType, location, description].every((field) => field.isValid);
  storeManager.dispatch({
    type: VacancyActions.FormSubmit,
    payload: {
      isValid,
    } as VacancyFormData,
  });
  return isValid;
}

async function createVacancy(body: VacancyFormFields) {
  const backendOrigin = backendStore.getData().backendOrigin;
  if (!validateVacancyForm(body)) {
    throw new TypeError('Form is not valid');
  }
  try {
    const newVacancy = makeVacancyFromApi(
      await apiCreateVacancy(backendOrigin, userStore.getData().csrfToken, {
        position: body.position,
        salary: Number(body.salary),
        location: body.location,
        workType: body.workType,
        description: body.description,
        positionGroup: body.positionGroup,
      }),
    );
    storeManager.dispatch({
      type: VacancyActions.Update,
      payload: {
        vacancy: newVacancy,
        loaded: true,
        appliers: [],
      } as UpdateActionPayload,
    } as UpdateAction);
    notificationActionCreators.addNotifications({
      text: 'Вакансия успешно создана',
      style: NotificationStyle.Ok,
      timeoutMs: NotificationTimeouts.Medium,
    });
  } catch (err) {
    assertIfError(err);
    catch_standard_api_errors(err);
    vacancyActionCreators.clearVacancy();
  }
}

async function updateVacancy(id: number, body: VacancyFormFields) {
  if (!validateVacancyForm(body)) {
    throw new TypeError('Form is not valid');
  }
  try {
    const updatedVacancy = makeVacancyFromApi(
      await apiUpdateVacancy(backendStore.getData().backendOrigin, userStore.getData().csrfToken, {
        id,
        position: body.position,
        salary: Number(body.salary),
        location: body.location,
        workType: body.workType,
        description: body.description,
        positionGroup: body.positionGroup,
      }),
    );
    const oldVacancy = vacancyStore.getData();
    storeManager.dispatch({
      type: VacancyActions.Update,
      payload: {
        vacancy: updatedVacancy,
        loaded: true,
        appliers: oldVacancy.appliers,
      } as UpdateActionPayload,
    });
    notificationActionCreators.addNotifications({
      text: 'Вакансия успешно обновлена',
      style: NotificationStyle.Ok,
      timeoutMs: NotificationTimeouts.Medium,
    });
  } catch (err) {
    assertIfError(err);
    catch_standard_api_errors(err);
  }
}

async function loadVacancy(id: number) {
  const backendOrigin = backendStore.getData().backendOrigin;
  clearVacancy();
  try {
    const loadedVacancy = makeVacancyFromApi(await getVacancy(backendOrigin, id));
    const userData = userStore.getData();
    let loadedAppliers: Applicant[];
    if (userData.userType === UserType.Employer && userData.id === loadedVacancy.employerId) {
      const rawAppliers = await getVacancyAppliers(backendOrigin, userData.csrfToken, id);
      loadedAppliers = rawAppliers.subscribers.map((apiApplicant) =>
        makeApplicantFromApi(apiApplicant),
      );
    }
    storeManager.dispatch({
      type: VacancyActions.Update,
      payload: {
        vacancy: loadedVacancy,
        loaded: true,
        appliers: loadedAppliers,
      } as UpdateActionPayload,
    } as UpdateAction);
  } catch (err) {
    assertIfError(err);
    catch_standard_api_errors(err);
    storeManager.dispatch({
      type: VacancyActions.Update,
      payload: {
        vacancy: null,
        loaded: true,
      } as UpdateActionPayload,
    } as UpdateAction);
  }
}

async function removeVacancy(id: number) {
  const backendOrigin = backendStore.getData().backendOrigin;
  try {
    const token = userStore.getData().csrfToken;
    await deleteVacancy(backendOrigin, token, id);
    clearVacancy();
    notificationActionCreators.addNotifications({
      text: 'Вакансия успешно удалена',
      style: NotificationStyle.Ok,
      timeoutMs: NotificationTimeouts.Medium,
    });
  } catch (err) {
    catch_standard_api_errors(err);
    assertIfError(err);
  }
}

async function loadApplyStatus(vacancyId: number) {
  const backendOrigin = backendStore.getData().backendOrigin;
  try {
    const application = (await getVacancyApplyStatus(
      backendOrigin,
      userStore.getData().csrfToken,
      vacancyId,
    )) as Application;
    if (application.isSubscribed) {
      storeManager.dispatch({
        type: VacancyActions.Apply,
      });
    } else {
      storeManager.dispatch({
        type: VacancyActions.ResetApply,
      });
    }
  } catch (err) {
    catch_standard_api_errors(err);
    assertIfError(err);
  }
}

async function loadFavoriteStatus(vacancyId: number) {
  const backendOrigin = backendStore.getData().backendOrigin;
  try {
    const userData = userStore.getData();
    if (userData.userType !== UserType.Applicant) {
      return;
    }
    const favoriteVacancyList = await getApplicantFavoriteVacancies(backendOrigin, userData.id);
    const isFavorite = favoriteVacancyList.some((vacancy) => vacancy.id === vacancyId);
    if (isFavorite) {
      storeManager.dispatch({
        type: VacancyActions.AddToFavorite,
      });
    } else {
      storeManager.dispatch({
        type: VacancyActions.RemoveFromFavorite,
      });
    }
  } catch (err) {
    catch_standard_api_errors(err);
    assertIfError(err);
  }
}

async function applyVacancy(vacancyId: number) {
  const backendOrigin = backendStore.getData().backendOrigin;
  try {
    const token = userStore.getData().csrfToken;
    await applyToVacancy(backendOrigin, token, vacancyId);
    storeManager.dispatch({
      type: VacancyActions.Apply,
    });
  } catch (err) {
    catch_standard_api_errors(err);
    assertIfError(err);
  }
}

async function addVacancyToFavorite(vacancyId: number) {
  const backendOrigin = backendStore.getData().backendOrigin;
  try {
    const token = userStore.getData().csrfToken;
    await addVacancyToFavorites(backendOrigin, token, vacancyId);
    storeManager.dispatch({
      type: VacancyActions.AddToFavorite,
    });
  } catch (err) {
    catch_standard_api_errors(err);
    assertIfError(err);
  }
}

async function removeVacancyFromFavorite(vacancyId: number) {
  const backendOrigin = backendStore.getData().backendOrigin;
  try {
    const token = userStore.getData().csrfToken;
    await removeVacancyFromFavorites(backendOrigin, token, vacancyId);
    storeManager.dispatch({
      type: VacancyActions.RemoveFromFavorite,
    });
  } catch (err) {
    catch_standard_api_errors(err);
    assertIfError(err);
  }
}

async function removeApplyVacancy(vacancyId: number) {
  const backendOrigin = backendStore.getData().backendOrigin;
  try {
    const token = userStore.getData().csrfToken;
    await resetApplyToVacancy(backendOrigin, token, vacancyId);
    storeManager.dispatch({
      type: VacancyActions.ResetApply,
    });
  } catch (err) {
    catch_standard_api_errors(err);
    assertIfError(err);
  }
}

function clearVacancy() {
  storeManager.dispatch({
    type: VacancyActions.Clear,
  } as ClearAction);
}

export const vacancyActionCreators = {
  loadApplyStatus,
  applyVacancy,
  removeApplyVacancy,

  clearVacancy,

  loadFavoriteStatus,
  addVacancyToFavorite,
  removeVacancyFromFavorite,

  submitVacancyFields,

  createVacancy,
  loadVacancy,
  updateVacancy,
  removeVacancy,
};
