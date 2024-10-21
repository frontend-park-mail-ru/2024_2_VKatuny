import { ComponentController } from '../../modules/Components/Component.js';
import { REGISTER_APPLICANT } from '../../modules/Events/Events.js';

export class ApplicantRegistrationFormController extends ComponentController {
  constructor(model, view, controller) {
    super(model, view, controller);
    this.setHandlers([
      {
        event: REGISTER_APPLICANT,
        handler: this.register.bind(this),
      },
    ]);
  }

  register(formData) {
    throw new Error('Not Implemented');
    return formData;
  }
}
