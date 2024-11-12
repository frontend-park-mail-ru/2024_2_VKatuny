import { ComponentView } from '../../modules/Components/Component.js';
import CvArticleHbs from './cv-article.hbs';

export class CvArticleView extends ComponentView {
  constructor({ elementClass, isOwner, isEmployer }, existingElement) {
    super({
      renderParams: {
        elementClass,
        isOwner,
        isEmployer,
      },
      template: CvArticleHbs,
      existingElement,
    });
    this._avatar = this._html.querySelector('.cv-article__cv-picture');
    this._position = this._html.querySelector('.cv-article__header-text');
    this._jobSearchStatus = this._html.querySelector('.cv-article__job-search-status');
    this._workingExperience = this._html.querySelector('.cv-article__working-experience');
    this._description = this._html.querySelector('.cv-article__description');
  }

  renderData({
    positionRu,
    positionEn,
    description,
    jobSearchStatus,
    workingExperience,
    updatedAt,
  }) {
    this._position.innerText = positionEn ? `${positionRu} / ${positionEn}` : positionRu;
    this._jobSearchStatus.innerText = jobSearchStatus;
    this._description.innerText = description || 'Не указано';
    this._workingExperience.innerText = workingExperience || 'Не указан';
    this._updatedAt.innerText = `последнее обновление: ${updatedAt.toLocaleDateString('ru-RU', {
      weekday: 'short',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    })}`;
  }

  addButtonContainer(containerRender) {
    this._html.appendChild(containerRender);
    this._updatedAt = this._html.querySelector('.cv-article__created-at');
  }
}
