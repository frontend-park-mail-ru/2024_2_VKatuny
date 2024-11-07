import { PageView } from '../../modules/Page/Page.js';

export class CvPageView extends PageView {
  constructor(renderParams) {
    renderParams.isEmployer = !renderParams.isApplicant && renderParams.isAuthorized;
    super({
      templateName: 'cv-page.hbs',
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
