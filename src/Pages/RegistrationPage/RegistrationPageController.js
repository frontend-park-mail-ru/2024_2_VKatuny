import { CHANGE_USER_TYPE } from '@/modules/Events/Events';
import { PageController } from '@/modules/Page/Page';
import USER_TYPE from '@/modules/UserSession/UserType';

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
      case USER_TYPE.APPLICANT: {
        this._view.setApplicantForm();
        break;
      }
      case USER_TYPE.EMPLOYER: {
        this._view.setEmployerForm();
        break;
      }
    }
  }
}
