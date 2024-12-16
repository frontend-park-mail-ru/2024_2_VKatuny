import { ProfileFormFields, profileStore } from '../stores/profile_store/profile_store';
import { ProfileFormData } from '../stores/profile_store/profile_store';
import { validateOk, validateRequired } from '../validators/validators';
import { FormValue } from '../models/form_value';
import { storeManager } from '@/modules/store_manager/store_manager';
import { ProfileActions } from '../stores/profile_store/profile_actions';
import { UserType } from '../models/user-type';
import {
  getApplicantCvs,
  getApplicantFavoriteVacancies,
  getEmployerVacancies,
  updateApplicantProfile,
  updateEmployerProfile,
} from '@api/api';
import { userStore } from '../stores/user_store/user_store';
import { backendStore } from '../stores/backend_store/backend_store';
import { Applicant } from '../models/applicant';
import { Employer } from '../models/employer';
import { userActionCreators } from './user_action_creators';
import { getUser } from '../models/utils/get_user';
import { UpdateProfilePayload } from '../stores/profile_store/profile_actions';
import { assertIfError } from '@/modules/common_utils/asserts/asserts';
import { makeVacancyFromApi } from '../models/vacancy';
import { makeCvFromApi } from '../models/cv';

const profileFieldsValidators = new Map(
  Object.entries({
    firstName: validateRequired,
    secondName: validateRequired,
    birthDate: validateRequired,
    city: validateOk,
    education: validateOk,
    contacts: validateOk,
  }),
);

function submitProfileFields(data: ProfileFormFields) {
  const validatedData: ProfileFormData = {};
  Object.entries(data).forEach(([key, value]) => {
    (validatedData as { [key: string]: FormValue })[key] = profileFieldsValidators.get(key)(value);
  });
  storeManager.dispatch({
    type: ProfileActions.ProfileFormSubmit,
    payload: validatedData,
  });
}

async function loadProfile(userType: UserType, id: number) {
  clearProfile();
  try {
    const backendOrigin = backendStore.getData().backendOrigin;
    const loadedProfile = await getUser(backendOrigin, userType, id);
    storeManager.dispatch({
      type: ProfileActions.UpdateProfile,
      payload: {
        userProfile: loadedProfile,
        userType: userType,
        profileLoaded: true,
      } as UpdateProfilePayload,
    });
    switch (userType) {
      case UserType.Employer: {
        const vacancyList = await getEmployerVacancies(backendOrigin, id);
        storeManager.dispatch({
          type: ProfileActions.UpdateVacancyList,
          payload: vacancyList.map((vacancy) => makeVacancyFromApi(vacancy)),
        });
        break;
      }
      case UserType.Applicant: {
        const cvList = await getApplicantCvs(backendOrigin, id);
        storeManager.dispatch({
          type: ProfileActions.UpdateCvList,
          payload: cvList.map((cv) => makeCvFromApi(cv)),
        });
        const favoriteVacancyList = await getApplicantFavoriteVacancies(backendOrigin, id);
        storeManager.dispatch({
          type: ProfileActions.UpdateFavoriteVacancyList,
          payload: favoriteVacancyList.map((vacancy) => makeVacancyFromApi(vacancy)),
        });
        break;
      }
    }
  } catch (err) {
    assertIfError(err);
    console.log(err);
    clearProfile(true);
  }
}

function clearProfileForm() {
  storeManager.dispatch({
    type: ProfileActions.ProfileFormReset,
  });
}

function clearProfile(loaded: boolean = false) {
  storeManager.dispatch({
    type: ProfileActions.UpdateProfile,
    payload: {
      userProfile: null,
      userType: null,
      profileLoaded: loaded,
    } as UpdateProfilePayload,
  });
}

async function updateProfile(userType: UserType, body: ProfileFormFields) {
  submitProfileFields(body as ProfileFormFields);
  const validatedForm = profileStore.getData().profileForm;
  let isValid = false;
  if (userType === UserType.Applicant) {
    const { firstName, secondName, birthDate, education, contacts, city } = validatedForm;
    isValid = [firstName, secondName, birthDate, education, contacts, city].every(
      (field) => field.isValid,
    );
  } else {
    const { firstName, secondName, contacts, city } = validatedForm;
    isValid = [firstName, secondName, contacts, city].every((field) => field.isValid);
  }
  if (!isValid) {
    storeManager.dispatch({
      type: ProfileActions.ProfileFormSubmit,
      payload: {
        isValid,
      } as ProfileFormData,
    });
    return false;
  }

  const backendOrigin = backendStore.getData().backendOrigin;
  const userData = userStore.getData();
  try {
    const token = userStore.getData().csrfToken;
    if (userType === UserType.Applicant) {
      await updateApplicantProfile(backendOrigin, token, {
        id: userData.id,
        firstName: body.firstName,
        secondName: body.secondName,
        city: body.city,
        birthDate: new Date(body.birthDate),
        education: body.education,
        contacts: body.contacts,
      });
      const applicant = userStore.getData().userProfile as Applicant;
      applicant.firstName = body.firstName;
      applicant.secondName = body.secondName;
      applicant.city = body.city;
      applicant.birthDate = new Date(body.birthDate);
      applicant.education = body.education;
      applicant.contacts = body.contacts;
      userActionCreators.updateProfile(applicant as Applicant);
    } else {
      await updateEmployerProfile(backendOrigin, token, {
        id: userData.id,
        firstName: body.firstName,
        secondName: body.secondName,
        city: body.city,
        contacts: body.contacts,
      });
      const employer = userStore.getData().userProfile as Employer;
      employer.firstName = body.firstName;
      employer.secondName = body.secondName;
      employer.city = body.city;
      employer.contacts = body.contacts;
      userActionCreators.updateProfile(employer);
    }
    return true;
  } catch {
    return false;
  }
}

export const profileActionCreators = {
  submitProfileFields,
  updateProfile,
  clearProfileForm,
  loadProfile,
  clearProfile,
};
