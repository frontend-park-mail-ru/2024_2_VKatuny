import { ComponentView } from '../../modules/Components/Component.js';

export class PersonalInfoBoxView extends ComponentView {
  constructor({ elementClass }, existingElement) {
    super({
      renderParams: { elementClass },
      existingElement,
      templateName: 'personal-info-box.hbs',
    });
  }
}
