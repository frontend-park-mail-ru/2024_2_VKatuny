import { RegistrationPageView } from './RegistrationPageView';
import { RegistrationPageController } from './RegistrationPageController';
import { RegistrationPageModel } from './RegistrationPageModel';
import { Page } from '@/modules/Page/Page';
import { UserTypeRadiogroup } from '@/Components/FormInputs/UserTypeRadiogroup/UserTypeRadiogroup';
import { ApplicantRegistrationForm } from '@/Components/ApplicantRegistrationForm/ApplicantRegistrationForm';
import { EmployerRegistrationForm } from '@/Components/EmployerRegistrationForm/EmployerRegistrationForm';
import state from '@/modules/AppState/AppState';

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
