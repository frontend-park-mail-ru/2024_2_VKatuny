import { Component } from './Component.js';

export class VacancyCard extends Component {
  constructor({ employer, vacancy }, existingElement) {
    super({
      templateName: 'vacancy-card.hbs',
      existingElement,
      renderParams: { employer, vacancy },
    });
  }
}
