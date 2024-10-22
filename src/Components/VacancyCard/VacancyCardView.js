import { ComponentView } from '../../modules/Components/Component.js';

export class VacancyCardView extends ComponentView {
  constructor({ employer, vacancy }, existingElement) {
    super({
      renderParams: {
        employer,
        vacancy,
      },
      templateName: 'vacancy-card.hbs',
      existingElement,
    });
  }
}
