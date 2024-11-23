import { PageController } from '@/modules/Page/Page';

export class SurveyStatsPageController extends PageController {
  constructor({ model, view, component }) {
    super(model, view, component);
    this.loadPage();
  }

  async loadPage() {
    const stats = this._model.getStats();
    this._view.renderStats(stats);
  }
}
