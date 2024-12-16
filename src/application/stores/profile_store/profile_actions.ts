/** @fileoverview This file contains actions for profile store */

import { UserType } from '@/application/models/user-type';
import { Applicant } from '@/application/models/applicant';
import { Employer } from '@/application/models/employer';
import { ProfileFormData } from './profile_store';
import { Vacancy } from '@/application/models/vacancy';
import { Cv } from '@/application/models/cv';

export enum ProfileActions {
  UpdateProfile = 'updateProfile',
  ProfileFormSubmit = 'profileFormSubmit',
  ProfileFormReset = 'profileFormReset',
  UpdateVacancyList = 'updateVacancyList',
  UpdateCvList = 'updateCvList',
  UpdateFavoriteVacancyList = 'updateFavoriteVacancyList',
}

export interface UpdateProfileAction {
  type: ProfileActions.UpdateProfile;
  payload: Applicant | Employer;
}

export interface UpdateVacancyListAction {
  type: ProfileActions.UpdateVacancyList;
  payload: Vacancy[];
}

export interface UpdateFavoriteVacancyListAction {
  type: ProfileActions.UpdateFavoriteVacancyList;
  payload: Vacancy[];
}

export interface UpdateCvListAction {
  type: ProfileActions.UpdateCvList;
  payload: Cv[];
}

export interface UpdateProfilePayload {
  userType: UserType;
  userProfile: Applicant | Employer;
  profileLoaded: boolean;
}

export interface ProfileFormSubmitAction {
  type: ProfileActions.ProfileFormSubmit;
  payload: ProfileFormData;
}

export interface ProfileFormResetAction {
  type: ProfileActions.ProfileFormReset;
  payload: ProfileFormData;
}
