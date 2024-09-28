import { Page } from '/src/modules/Page/Page.js';

export class VacanciesPage extends Page {
  constructor(url) {
    super(url);
  }

  render() {
    return Handlebars.templates['vacancies.hbs']();
  }
}
