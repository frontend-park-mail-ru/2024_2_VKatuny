import { Page } from '@/modules/Page/Page';
import { SurveyPageModel } from './SurveyPageModel';
import { SurveyPageController } from './SurveyPageController';
import { SurveyPageView } from './SurveyPageView';
import { NotFoundError } from '@/modules/Router/Router';
import { FORM_TYPES } from './SurveyPageModel';

const FORM_TYPE_PARAM = 'form';

export class SurveyPage extends Page {
  #formType;
  constructor({ url }) {
    super({
      url,
      modelClass: SurveyPageModel,
      controllerClass: SurveyPageController,
      viewClass: SurveyPageView,
    });
    this.#formType = url.searchParams.get(FORM_TYPE_PARAM);
    if (!Object.values(FORM_TYPES).includes(this.#formType)) {
      throw new NotFoundError();
    }
  }

  async postRenderInit() {
    this.makeForm({ type: this.#formType });
  }

  async makeForm({ type }) {
    const formQuestions = await this._model.getSurveyForm({ type });
    if (!formQuestions.length) {
      throw new NotFoundError();
    }
    this._children.push(...formQuestions);
    this._view.renderForm(
      formQuestions.map((question) => {
        return question.render();
      }),
    );
  }
}
