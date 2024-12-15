import { storeManager } from '@/modules/store_manager/store_manager';
import { backendStore } from '../stores/backend_store/backend_store';
import {
  ClearAction,
  UpdateAction,
  UpdateActionPayload,
  VacancyActions,
} from '../stores/vacancy_store/vacancy_actions';
import { makeVacancyFromApi } from '../models/vacancy';
import {
  applyToVacancy,
  deleteVacancy,
  getVacancy,
  getVacancyAppliers,
  getVacancyApplyStatus,
  resetApplyToVacancy,
} from '@/modules/api/api';
import { assertIfError } from '@/modules/common_utils/asserts/asserts';
import { Application } from '@/modules/api/src/responses/application';
import { makeApplicantFromApi } from '../models/applicant';
import { userStore } from '../stores/user_store/user_store';
import { UserType } from '../models/user-type';
import { Applicant } from '../models/applicant';

async function loadVacancy(id: number) {
  const backendOrigin = backendStore.getData().backendOrigin;
  clearVacancy();
  try {
    const loadedVacancy = makeVacancyFromApi(await getVacancy(backendOrigin, id));
    const userData = userStore.getData();
    let loadedAppliers: Applicant[];
    if (userData.userType === UserType.Employer && userData.id === loadedVacancy.employerId) {
      const rawAppliers = await getVacancyAppliers(backendOrigin, id);
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
    console.log(err);
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
    await deleteVacancy(backendOrigin, id);
    clearVacancy();
  } catch (err) {
    assertIfError(err);
    console.log(err);
  }
}

async function loadApplyStatus(vacancyId: number) {
  const backendOrigin = backendStore.getData().backendOrigin;
  try {
    const application = (await getVacancyApplyStatus(backendOrigin, vacancyId)) as Application;
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
    assertIfError(err);
    console.log(err);
  }
}

async function applyVacancy(vacancyId: number) {
  const backendOrigin = backendStore.getData().backendOrigin;
  try {
    await applyToVacancy(backendOrigin, vacancyId);
    storeManager.dispatch({
      type: VacancyActions.Apply,
    });
  } catch (err) {
    assertIfError(err);
    console.log(err);
  }
}

async function removeApplyVacancy(vacancyId: number) {
  const backendOrigin = backendStore.getData().backendOrigin;
  try {
    await resetApplyToVacancy(backendOrigin, vacancyId);
    storeManager.dispatch({
      type: VacancyActions.ResetApply,
    });
  } catch (err) {
    assertIfError(err);
    console.log(err);
  }
}

function clearVacancy() {
  storeManager.dispatch({
    type: VacancyActions.Clear,
  } as ClearAction);
}

export const vacancyActionCreators = {
  loadVacancy,
  loadApplyStatus,
  applyVacancy,
  removeApplyVacancy,
  clearVacancy,
  removeVacancy,
};
