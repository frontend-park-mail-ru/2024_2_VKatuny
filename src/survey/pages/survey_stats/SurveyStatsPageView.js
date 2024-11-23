import { PageView } from '@/modules/Page/Page';
import SurveyStatsPageHbs from './not-found-page.hbs';

export class SurveyStatsPageView extends PageView {
  constructor({ url }) {
    super({ renderParams: { notFoundUrl: url }, template: SurveyStatsPageHbs });
  }

  renderStats(stats) {
    this._html.appendChild(stats);
  }
}
