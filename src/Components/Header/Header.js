import { Component } from '../../modules/Components/Component.js';
import { HeaderController } from './HeaderController.js';
import { HeaderModel } from './HeaderModel.js';
import { HeaderView } from './HeaderView.js';
import state from '/src/modules/AppState/AppState.js';
import USER_TYPE from '../../modules/UserSession/UserType.js';

export class Header extends Component {
  constructor({ viewParams, existingElement }) {
    super({
      modelClass: HeaderModel,
      controllerClass: HeaderController,
      viewClass: HeaderView,
      viewParams,
      existingElement,
    });
  }

  static getViewParams() {
    return {
      userAuthenticated: state.userSession.isLoggedIn,
      userType: state.userSession.russianUserType,
      isApplicant: state.userSession.userType === USER_TYPE.APPLICANT,
      userFullName: state.userSession.getUserFullName(),
    };
  }
}
