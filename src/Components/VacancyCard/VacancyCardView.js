import { ComponentView } from '../../modules/Components/Component.js';

export class VacancyCardView extends ComponentView {
  constructor({ vacancyObj }, existingElement) {
    super({
      renderParams: vacancyObj,
      templateName: 'vacancy-card.hbs',
      existingElement,
    });
  }
}
