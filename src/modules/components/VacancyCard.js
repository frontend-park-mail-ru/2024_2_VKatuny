import { Component } from './Component.js';

export class VacancyCard extends Component {
  constructor() {
    super();
  }

  render({ logo, name, city }, { position, salary, description, createdAt }) {
    return Handlebars.templates['vacancy-card.hbs']({
      employer: { logo: logo, name: name, city: city },
      vacancy: {
        position: position,
        salary: salary,
        description: description,
        createdAt: createdAt,
      },
    });
  }
}
