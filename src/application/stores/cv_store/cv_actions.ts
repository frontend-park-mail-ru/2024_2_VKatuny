/** @fileoverview This file contains actions for cv store */

import { Cv } from '@/application/models/cv';
import { CvFormData } from './cv_store';

export enum CvActions {
  Update = 'cvUpdate',
  Clear = 'cvClear',
  FormSubmit = 'cvFormSubmit',
}

export interface UpdateActionPayload {
  cv: Cv;
  loaded: boolean;
}

export interface UpdateAction {
  type: CvActions.Update;
  payload: UpdateActionPayload;
}

export interface ClearAction {
  type: CvActions.Clear;
}

export interface CvFormSubmitAction {
  type: CvActions.FormSubmit;
  payload: CvFormData;
}
