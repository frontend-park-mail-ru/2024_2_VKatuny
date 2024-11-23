import { Page } from '@/modules/Page/Page';
import { SurveyPageController } from '../survey_page/SurveyPageController';
import { SurveyPageModel } from '../survey_page/SurveyPageModel';
import { SurveyPageView } from '../survey_page/SurveyPageView';
import AppState from '@/modules/AppState/AppState';

export class SurveyStatsPage extends Page {
  constructor({ url }) {
    super({
      url,
      modelClass: SurveyPageModel,
      viewClass: SurveyPageView,
      controllerClass: SurveyPageController,
      viewParams: { url },
    });
    AppState.userSession.goToHomePageIfNotLoggedIn();
  }
}
