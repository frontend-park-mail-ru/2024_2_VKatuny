import { ComponentController } from '@/modules/Components/Component';
import { NOTIFICATION_OK, REDIRECT_TO, SUBMIT_FORM } from '@/modules/Events/Events';
import { Vacancy } from '@/modules/models/Vacancy';
import { VacancyPage } from '@/Pages/VacancyPage/VacancyPage';
import { resolveUrl } from '@/modules/UrlUtils/UrlUtils';
import eventBus from '@/modules/Events/EventBus';
import { NOTIFICATION_ERROR } from '@/modules/Events/Events';
import { NOTIFICATION_TIMEOUT } from '@/Components/NotificationBox/NotificationBox';
import { catchStandardResponseError } from '@/modules/Api/Errors';

export class VacancyFormController extends ComponentController {
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
      this._component._positionField.controller.validateInput({
        callerView: this._component._positionField._view,
      }),

      this._component._salaryField.controller.validateInput({
        callerView: this._component._salaryField._view,
      }),

      this._component._workTypeField.controller.validateInput({
        callerView: this._component._workTypeField._view,
      }),

      this._component._locationField.controller.validateInput({
        callerView: this._component._locationField._view,
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
      const vacancy = await this._model.submit(new Vacancy(this._view.getData()));
      if (!vacancy) {
        return;
      }
      const query = {};
      query[VacancyPage.VACANCY_ID_PARAM] = vacancy.id;
      eventBus.emit(NOTIFICATION_OK, {
        message: 'Операция проведена успешно',
        timeout: NOTIFICATION_TIMEOUT.MEDIUM,
      });
      eventBus.emit(REDIRECT_TO, { redirectUrl: resolveUrl('vacancy', query) });
    } catch (err) {
      catchStandardResponseError(err);
    }
  }

  async reset() {
    const oldData = await this._model.getLastValidData();
    this._view.renderData(oldData);
    return true;
  }
}
