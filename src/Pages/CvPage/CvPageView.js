import { PageView } from '../../modules/Page/Page.js';
import CvPageHbs from './cv-page.hbs';

export class CvPageView extends PageView {
  constructor(renderParams) {
    renderParams.isEmployer = !renderParams.isApplicant && renderParams.isAuthorized;
    super({
      template: CvPageHbs,
      renderParams: renderParams,
    });
    this.header = this._html.querySelector('.header');
    this.profileMinicard = this._html.querySelector('.cv-page__profile-minicard');
    this.cvContainer = this._html.querySelector('.cv-page__cv-container');
    this.sideColumn = this._html.querySelector('.cv-page__left-column');
  }

  addCvArticle(render) {
    this.cvContainer.innerHTML = '';
    this.cvContainer.appendChild(render);
  }
}
