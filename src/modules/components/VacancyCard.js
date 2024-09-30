import { Component } from './Component.js';

export class VacancyCard extends Component {
  constructor(renderParams) {
    super(renderParams);
  }

  renderStatic(renderParams) {
    return Handlebars.templates['vacancy-card.hbs'](renderParams);
  }
}
