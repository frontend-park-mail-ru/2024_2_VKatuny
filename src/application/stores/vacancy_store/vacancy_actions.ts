/** @fileoverview This file contains actions for vacancy store */

import { Vacancy } from '@/application/models/vacancy';
import { Applicant } from '@/application/models/applicant';
import { VacancyFormData } from './vacancy_store';

export enum VacancyActions {
  Apply = 'vacancyApply',
  ResetApply = 'vacancyResetApply',
  AddToFavorite = 'vacancyAddToFavorite',
  RemoveFromFavorite = 'vacancyRemoveFromFavorite',
  Update = 'vacancyUpdate',
  Clear = 'vacancyClear',
  FormSubmit = 'vacancyFormSubmit',
}

export interface UpdateActionPayload {
  vacancy: Vacancy;
  loaded: boolean;
  appliers: Array<Applicant>;
}

export interface UpdateAction {
  type: VacancyActions.Update;
  payload: UpdateActionPayload;
}

export interface ApplyAction {
  type: VacancyActions.Apply;
}

export interface ResetApplyAction {
  type: VacancyActions.ResetApply;
}

export interface AddToFavoriteAction {
  type: VacancyActions.AddToFavorite;
}

export interface RemoveFromFavoriteAction {
  type: VacancyActions.RemoveFromFavorite;
}

export interface ClearAction {
  type: VacancyActions.Clear;
}

export interface VacancyFormSubmitAction {
  type: VacancyActions.FormSubmit;
  payload: VacancyFormData;
}
