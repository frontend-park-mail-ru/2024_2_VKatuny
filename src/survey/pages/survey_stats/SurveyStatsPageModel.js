import { Api } from '@/modules/api/Api';
import { PageModel } from '@/modules/Page/Page';

export class SurveyStatsPageModel extends PageModel {
  async getStats() {
    return await Api.getSurveyStats();
  }
}
