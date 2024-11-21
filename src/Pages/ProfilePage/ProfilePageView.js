import { PageView } from '@/modules/Page/Page';
import ProfilePageHbs from './profile-page.hbs';
import { ProfileMinicardView } from '@/Components/ProfileMinicard/ProfileMinicardView';
import { zip } from '@common_utils/object_utils/zip';

export class ProfilePageView extends PageView {
  constructor(renderParams) {
    super({
      template: ProfilePageHbs,
      renderParams: zip(renderParams, ProfileMinicardView.generateRenderParams()),
    });
    this._header = this._html.querySelector('.header');
    this._frameSeries = this._html.querySelector('.profile-page__frame-series');
    this._profileMinicard = this._html.querySelector('.profile-page__profile-minicard');
  }

  get profileMinicard() {
    return this._profileMinicard;
  }
}
