import { ComponentView } from '../../modules/Components/Component.js';
import VacancyCardHbs from './vacancy-card.hbs';

export class VacancyCardView extends ComponentView {
  constructor(
    { avatar, id, position, companyName, location, salary, description, updatedAt },
    existingElement,
  ) {
    const renderParams = { avatar, id, position, companyName, location, salary, description };
    renderParams.updatedAt = updatedAt.toLocaleDateString('ru-RU', {
      weekday: 'short',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    });
    renderParams.salary = renderParams.salary ? `${renderParams.salary} руб.` : 'Не указана';

    super({
      renderParams,
      template: VacancyCardHbs,
      existingElement,
    });
  }
}
