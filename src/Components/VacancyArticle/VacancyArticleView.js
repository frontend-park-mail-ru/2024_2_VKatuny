import { ComponentView } from '@/modules/Components/Component';
import VacancyArticleHbs from './vacancy-article.hbs';
export class VacancyArticleView extends ComponentView {
  constructor({ elementClass, isOwner, isApplicant }, existingElement) {
    super({
      renderParams: {
        elementClass,
        isOwner,
        isApplicant,
      },
      template: VacancyArticleHbs,
      existingElement,
    });
    this._avatar = this._html.querySelector('.vacancy-article__company-picture');
    this._position = this._html.querySelector('.vacancy-summary__header');
    this._companyName = this._html.querySelector('.vacancy-summary__company-name');
    this._salary = this._html.querySelector('.vacancy-summary__salary');
    this._workType = this._html.querySelector('.vacancy-summary__work-type');
    this._description = this._html.querySelector('.vacancy-article__description');
  }

  renderData({
    avatar,
    position,
    companyName,
    salary,
    workType,
    description,
    location,
    updatedAt,
  }) {
    this._avatar.src = avatar;
    this._position.innerText = position;
    this._companyName.innerText = `${companyName}, ${location}`;
    this._salary.innerText = salary ? `${salary} руб.` : 'Не указана';
    this._workType.innerText = workType;
    this._description.innerText = description;
    this._updatedAt.innerText = `последнее обновление: ${updatedAt.toLocaleDateString('ru-RU', {
      weekday: 'short',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    })}`;
  }

  addButtonContainer(containerRender) {
    this._html.appendChild(containerRender);
    this._updatedAt = this._html.querySelector('.vacancy-article__created-at');
  }
}
