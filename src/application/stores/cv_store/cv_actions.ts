/** @fileoverview This file contains actions for cv store */

import { Cv } from '@/application/models/cv';
import { CvFormData } from './cv_store';
import { PdfLocation } from '@/modules/api/src/responses/pdf';

export enum CvActions {
  Update = 'cvUpdate',
  Clear = 'cvClear',
  FormSubmit = 'cvFormSubmit',
  LoadPdf = 'cvLoadPdf',
}

export interface LoadPdfAction {
  type: CvActions.LoadPdf;
  payload: PdfLocation;
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
