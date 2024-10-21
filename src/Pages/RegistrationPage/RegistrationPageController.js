import { CHANGE_USER_TYPE } from '../../modules/Events/Events.js';
import { PageController } from '../../modules/Page/Page.js';
import userTypes from '/src/modules/UserTypes.js';

export class RegistrationPageController extends PageController {
  constructor(model, view, component) {
    super(model, view, component);
    this.setHandlers([
      {
        event: CHANGE_USER_TYPE,
        handler: this.switchForm.bind(this),
      },
    ]);
  }

  switchForm(userType) {
    switch (userType) {
      case userTypes.APPLICANT: {
        this._view.setApplicantForm();
        break;
      }
      case userTypes.EMPLOYER: {
        this._view.setEmployerForm();
        break;
      }
    }
  }
}
