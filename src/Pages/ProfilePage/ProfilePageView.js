import { PageView } from '../../modules/Page/Page.js';

export class ProfilePageView extends PageView {
  constructor(renderParams) {
    super({
      templateName: 'profile-page.hbs',
      renderParams,
    });
    this._header = this._html.querySelector('.header');
    this._frameSeries = this._html.querySelector('.profile-page__frame-series');
    this._profileMinicard = this._html.querySelector('.profile-page__profile-minicard');
  }

  get profileMinicard() {
    return this._profileMinicard;
  }
}
