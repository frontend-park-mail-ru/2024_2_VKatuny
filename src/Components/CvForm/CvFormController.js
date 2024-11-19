import { ComponentController } from '@/modules/Components/Component';
import {
  NOTIFICATION_ERROR,
  NOTIFICATION_OK,
  REDIRECT_TO,
  SUBMIT_FORM,
} from '@/modules/Events/Events';
import { CvPage } from '@/Pages/CvPage/CvPage';
import { Cv } from '@/modules/models/Cv';
import { resolveUrl } from '@/modules/UrlUtils/UrlUtils';
import eventBus from '@/modules/Events/EventBus';
import { NOTIFICATION_TIMEOUT } from '@/Components/NotificationBox/NotificationBox.js';
import { catchStandardResponseError } from '@/modules/Api/Errors.js';

export class CvFormController extends ComponentController {
  constructor(model, view, controller) {
    super(model, view, controller);
    this.setHandlers([
      {
        event: SUBMIT_FORM,
        handler: this.submit.bind(this),
      },
    ]);
  }

  _validate() {
    const errorMessage = this._model.validate(this._view.getData());
    if (errorMessage) {
      eventBus.emit(NOTIFICATION_ERROR, {
        message: errorMessage,
        timeout: NOTIFICATION_TIMEOUT.MEDIUM,
      });
      return false;
    }
    return [
      this._component._positionRuField.controller.validateInput({
        callerView: this._component._positionRuField._view,
      }),
      this._component._positionEnField.controller.validateInput({
        callerView: this._component._positionEnField._view,
      }),
      this._component._jobSearchStatusField.controller.validateInput({
        callerView: this._component._jobSearchStatusField._view,
      }),
      this._component._workingExperienceField.controller.validateInput({
        callerView: this._component._workingExperienceField._view,
      }),
      this._component._descriptionField.controller.validateInput({
        callerView: this._component._descriptionField._view,
      }),
    ].every((val) => val);
  }

  async submit({ caller }) {
    if (!Object.is(caller, this._view)) {
      return;
    }
    if (!this._validate()) {
      return;
    }
    try {
      const cv = await this._model.submit(new Cv(this._view.getData()));
      if (!cv) {
        return;
      }
      const query = {};
      query[CvPage.CV_ID_PARAM] = cv.id;
      eventBus.emit(NOTIFICATION_OK, {
        message: 'Операция проведена успешно',
        timeout: NOTIFICATION_TIMEOUT.MEDIUM,
      });
      eventBus.emit(REDIRECT_TO, { redirectUrl: resolveUrl('cv', query) });
    } catch (err) {
      catchStandardResponseError(err);
      return;
    }
  }

  async reset() {
    const oldData = await this._model.getLastValidData();
    this._view.renderData(oldData);
    return true;
  }
}
