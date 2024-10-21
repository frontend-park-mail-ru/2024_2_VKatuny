import { RegistrationPageView } from './RegistrationPageView.js';
import { RegistrationPageController } from './RegistrationPageController.js';
import { RegistrationPageModel } from './RegistrationPageModel.js';
import { Page } from '/src/modules/Page/Page.js';
import { UserTypeRadiogroup } from '/src/Components/FormInputs/UserTypeRadiogroup/UserTypeRadiogroup.js';
import { ApplicantRegistrationForm } from '../../Components/ApplicantRegistrationForm/ApplicantRegistrationForm.js';
import { EmployerRegistrationForm } from '/src/Components/EmployerRegistrationForm/EmployerRegistrationForm.js';

export class RegistrationPage extends Page {
  constructor({ url }) {
    super({
      url,
      modelClass: RegistrationPageModel,
      viewClass: RegistrationPageView,
      controllerClass: RegistrationPageController,
    });
  }

  postRenderInit() {
    this._userTypeRadioGroup = new UserTypeRadiogroup({}, this._view.userTypeRadiogroup);
    this._applicantForm = new ApplicantRegistrationForm({}, this._view.applicantForm);
    this._employerForm = new EmployerRegistrationForm({}, this._view.employerForm);
    this._children.push(this._userTypeRadioGroup, this._applicantForm, this._employerForm);
  }
}
