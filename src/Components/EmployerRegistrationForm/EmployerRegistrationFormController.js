import { ComponentController } from '../../modules/Components/Component.js';
import { REGISTER_EMPLOYER } from '../../modules/Events/Events.js';

export class EmployerRegistrationFormController extends ComponentController {
  constructor(model, view, controller) {
    super(model, view, controller);
    this.setHandlers([
      {
        event: REGISTER_EMPLOYER,
        handler: this.register.bind(this),
      },
    ]);
  }

  register(formData) {
    throw new Error('Not Implemented');
    return formData;
  }
}
