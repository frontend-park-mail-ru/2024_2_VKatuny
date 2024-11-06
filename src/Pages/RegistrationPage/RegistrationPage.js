import { RegistrationPageView } from './RegistrationPageView.js';
import { RegistrationPageController } from './RegistrationPageController.js';
import { RegistrationPageModel } from './RegistrationPageModel.js';
import { Page } from '/src/modules/Page/Page.js';
import { UserTypeRadiogroup } from '/src/Components/FormInputs/UserTypeRadiogroup/UserTypeRadiogroup.js';
import { ApplicantRegistrationForm } from '../../Components/ApplicantRegistrationForm/ApplicantRegistrationForm.js';
import { EmployerRegistrationForm } from '/src/Components/EmployerRegistrationForm/EmployerRegistrationForm.js';
import state from '../../modules/AppState/AppState.js';

export class RegistrationPage extends Page {
  constructor({ url }) {
    super({
      url,
      modelClass: RegistrationPageModel,
      viewClass: RegistrationPageView,
      controllerClass: RegistrationPageController,
    });
    state.userSession.goToHomePageIfLoggedIn();
  }

  postRenderInit() {
    this._userTypeRadioGroup = new UserTypeRadiogroup({
      existingElement: this._view.userTypeRadiogroup,
    });
    this._applicantForm = new ApplicantRegistrationForm({
      existingElement: this._view.applicantForm,
    });
    this._employerForm = new EmployerRegistrationForm({ existingElement: this._view.employerForm });
    this._children.push(this._userTypeRadioGroup, this._applicantForm, this._employerForm);
  }
}
