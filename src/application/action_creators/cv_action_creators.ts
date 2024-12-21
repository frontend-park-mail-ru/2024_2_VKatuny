import { storeManager } from '@/modules/store_manager/store_manager';
import { userStore } from '../stores/user_store/user_store';
import {
  ClearAction,
  CvActions,
  UpdateAction,
  UpdateActionPayload,
} from '../stores/cv_store/cv_actions';
import { backendStore } from '../stores/backend_store/backend_store';
import { makeCvFromApi } from '../models/cv';
import {
  getCv,
  deleteCv,
  createCv as apiCreateCv,
  updateCv as apiUpdateCv,
  convertCvToPdf,
} from '@/modules/api/api';
import { assertIfError } from '@/modules/common_utils/asserts/asserts';
import { FormValue } from '../models/form_value';
import { validateEnglish, validateRequired, validatorTrain } from '../validators/validators';
import { CvFormData, cvStore } from '../stores/cv_store/cv_store';
import { UserType } from '../models/user-type';
import { catch_standard_api_errors } from '../utils/catch_standard_api_errors';
import { notificationActionCreators } from './notification_action_creators';
import { NotificationStyle, NotificationTimeouts } from '../models/notification';

function clearCv() {
  storeManager.dispatch({
    type: CvActions.Clear,
  } as ClearAction);
}

async function loadCv(id: number) {
  const backendOrigin = backendStore.getData().backendOrigin;
  clearCv();
  try {
    const loadedCv = makeCvFromApi(await getCv(backendOrigin, id));
    storeManager.dispatch({
      type: CvActions.Update,
      payload: {
        cv: loadedCv,
        loaded: true,
      } as UpdateActionPayload,
    } as UpdateAction);
  } catch (err) {
    assertIfError(err);
    catch_standard_api_errors(err);
    storeManager.dispatch({
      type: CvActions.Update,
      payload: {
        cv: null,
        loaded: true,
      } as UpdateActionPayload,
    } as UpdateAction);
  }
}

async function removeCv(id: number) {
  const backendOrigin = backendStore.getData().backendOrigin;
  try {
    const token = userStore.getData().csrfToken;
    await deleteCv(backendOrigin, token, id);
    notificationActionCreators.addNotifications({
      text: 'Резюме успешно удалено',
      style: NotificationStyle.Ok,
      timeoutMs: NotificationTimeouts.Medium,
    });
    clearCv();
  } catch (err) {
    assertIfError(err);
    catch_standard_api_errors(err);
    console.log(err);
  }
}

export interface CvFormFields {
  positionRu?: string;
  positionEn?: string;
  jobSearchStatus?: string;
  description?: string;
  workingExperience?: string;
}

const cvFormValidators = new Map(
  Object.entries({
    positionRu: validateRequired,
    positionEn: validatorTrain(validateRequired, validateEnglish),
    jobSearchStatus: validateRequired,
    description: validateRequired,
    workingExperience: validateRequired,
  }),
);

function submitCvFields(data: CvFormFields) {
  const validatedData: CvFormData = {};
  Object.entries(data).forEach(([key, value]) => {
    (validatedData as { [key: string]: FormValue })[key] = cvFormValidators.get(key)(value);
  });
  storeManager.dispatch({
    type: CvActions.FormSubmit,
    payload: validatedData,
  });
}

function validateCvForm(formFields: CvFormFields): boolean {
  submitCvFields(formFields);
  let isValid = false;
  const userData = userStore.getData();
  if (userData.userType !== UserType.Applicant) {
    return false;
  }
  const { positionRu, positionEn, jobSearchStatus, description, workingExperience } =
    cvStore.getData().cvFormData;
  isValid = [positionRu, positionEn, jobSearchStatus, description, workingExperience].every(
    (field) => field.isValid,
  );
  storeManager.dispatch({
    type: CvActions.FormSubmit,
    payload: {
      isValid,
    } as CvFormData,
  });
  return isValid;
}

async function createCv(body: CvFormFields) {
  const backendOrigin = backendStore.getData().backendOrigin;
  if (!validateCvForm(body)) {
    throw new TypeError('form is not valid');
  }
  try {
    const newCv = makeCvFromApi(
      await apiCreateCv(backendOrigin, userStore.getData().csrfToken, {
        positionRu: body.positionRu,
        positionEn: body.positionEn,
        jobSearchStatus: body.jobSearchStatus,
        description: body.description,
        workingExperience: body.workingExperience,
      }),
    );
    storeManager.dispatch({
      type: CvActions.Update,
      payload: {
        cv: newCv,
        loaded: true,
      } as UpdateActionPayload,
    } as UpdateAction);
    notificationActionCreators.addNotifications({
      text: 'Резюме успешно создано',
      style: NotificationStyle.Ok,
      timeoutMs: NotificationTimeouts.Medium,
    });
  } catch (err) {
    assertIfError(err);
    catch_standard_api_errors(err);
    cvActionCreators.clearCv();
  }
}

async function updateCv(id: number, body: CvFormFields) {
  const backendOrigin = backendStore.getData().backendOrigin;
  if (!validateCvForm(body)) {
    throw new TypeError('form is not valid');
  }
  try {
    const updatedCv = makeCvFromApi(
      await apiUpdateCv(backendOrigin, userStore.getData().csrfToken, {
        id,
        positionRu: body.positionRu,
        positionEn: body.positionEn,
        jobSearchStatus: body.jobSearchStatus,
        description: body.description,
        workingExperience: body.workingExperience,
      }),
    );
    storeManager.dispatch({
      type: CvActions.Update,
      payload: {
        cv: updatedCv,
        loaded: true,
      } as UpdateActionPayload,
    } as UpdateAction);
    notificationActionCreators.addNotifications({
      text: 'Резюме успешно обновлено',
      style: NotificationStyle.Ok,
      timeoutMs: NotificationTimeouts.Medium,
    });
  } catch (err) {
    assertIfError(err);
    catch_standard_api_errors(err);
  }
}

async function loadPdf(cvId: number) {
  const backendOrigin = backendStore.getData().backendOrigin;
  try {
    const pdf = await convertCvToPdf(backendOrigin, cvId);
    storeManager.dispatch({
      type: CvActions.LoadPdf,
      payload: pdf,
    });
    const a = document.createElement('a');
    a.setAttribute('href', pdf.FileName);
    a.setAttribute('download', 'cv.pdf');
    a.click();
  } catch (err) {
    assertIfError(err);
    catch_standard_api_errors(err);
    storeManager.dispatch({
      type: CvActions.LoadPdf,
      payload: null,
    });
  }
}

export const cvActionCreators = {
  loadCv,
  clearCv,
  updateCv,
  createCv,
  removeCv,
  submitCvFields,
  loadPdf,
};
