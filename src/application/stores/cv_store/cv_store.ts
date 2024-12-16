import { Cv } from '@/application/models/cv';
import { CvActions, UpdateActionPayload } from './cv_actions';
import { Store } from '@/modules/store_manager/store';
import { storeManager } from '@/modules/store_manager/store_manager';
import { Action } from '@/modules/store_manager/action';
import { FormValue } from '@/application/models/form_value';
import { PdfLocation } from '@/modules/api/src/responses/pdf';

export interface CvData {
  cv?: Cv;
  loadedCv?: boolean;
  cvFormData?: CvFormData;
  pdf?: string;
}
export interface CvFormData {
  positionRu?: FormValue;
  positionEn?: FormValue;
  jobSearchStatus?: FormValue;
  description?: FormValue;
  workingExperience?: FormValue;
  isValid?: boolean;
  errorMsg?: string;
}

function cvStoreReducer(state: CvData, action: Action) {
  switch (action.type) {
    case CvActions.Update: {
      const payload = action.payload as UpdateActionPayload;
      state.cv = payload.cv;
      state.loadedCv = payload.loaded;
      return state;
    }
    case CvActions.Clear: {
      return {};
    }

    case CvActions.LoadPdf: {
      const payload = action.payload as PdfLocation;
      state.pdf = payload.location;
      return state;
    }

    case CvActions.FormSubmit: {
      const payload = action.payload as CvFormData;
      if (!state.cvFormData) {
        state.cvFormData = {};
      }
      Object.entries(payload).forEach(([key, value]) => {
        (state.cvFormData as { [key: string]: unknown })[key] = value;
      });
      return state;
    }
  }
  return state;
}

export const cvStore = new Store<CvData>({}, cvStoreReducer);

storeManager.addStore(cvStore);
