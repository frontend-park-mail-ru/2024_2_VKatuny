import { Header } from '../../Components/Header/Header.js';
import { Page } from '../../modules/Page/Page.js';
import { ProfilePageController } from './ProfilePageController.js';
import { ProfilePageModel } from './ProfilePageModel.js';
import { ProfilePageView } from './ProfilePageView.js';
import state from '/src/modules/AppState/AppState.js';
import { USER_TYPES } from '../../modules/UserSession/UserSession.js';
import { resolveUrl } from '../../modules/UrlUtils/UrlUtils.js';
import { FrameSeries } from '../../Components/FrameSeries/FrameSeries.js';
import { PersonalInfoBox } from '../../Components/PersonalInfoBox/PersonalInfoBox.js';

export class ProfilePage extends Page {
  constructor({ url }) {
    super({
      url,
      modelClass: ProfilePageModel,
      viewClass: ProfilePageView,
      controllerClass: ProfilePageController,
      viewParams: {
        userAuthenticated: state.userSession.isLoggedIn,
        userType: state.userSession.userType,
        isApplicant: state.userSession.userType === USER_TYPES['applicant'],
        userFullName: state.userSession.getUserFullName(),
      },
    });
    if (url.href === resolveUrl('myProfile').href) {
      state.userSession.goToHomePageIfNotLoggedIn();
    }
  }

  postRenderInit() {
    this._header = new Header({
      existingElement: this._view._header,
    });
    this._children.push(this._header);
    this._frameSeries = new FrameSeries({
      frames: [
        {
          frameName: 'personalInfo',
          frameCaption: 'Профиль',
          frameComponent: new PersonalInfoBox(),
        },
      ],
      existingElement: this._view._frameSeries,
    });
    this._children.push(this._frameSeries);
  }
}
