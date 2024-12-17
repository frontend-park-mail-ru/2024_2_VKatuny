import { Component } from '@/modules/vdom/virtual_node';
import * as vdom from '@/modules/vdom/virtual_dom';
import { Vacancy } from '@/application/models/vacancy';
import { resolveUrl } from '@/modules/common_utils/url_utils/url_utils';
import './vacancy_card.scss';

export interface VacancyCardProps {
  elementClass?: string;
  vacancy: Vacancy;
}

export class VacancyCard extends Component {
  constructor({ elementClass, vacancy }: VacancyCardProps) {
    super({ elementClass, vacancy });
  }

  render() {
    const vacancy = this.props.vacancy as Vacancy;
    return (
      <article className={`${this.props.elementClass} vacancy-card vacancy-card_theme-dark`}>
        <div className="vacancy-card__header-container">
          <img className="vacancy-card__company-picture" src={vacancy.avatar} />
          <div className="vacancy-card__header vacancy-summary">
            <a
              className="vacancy-card__header-link"
              href={resolveUrl('vacancy', { id: vacancy.id.toString() })}
            >
              <h1 className="vacancy-summary__header">{vacancy.position}</h1>
            </a>
            <div className="vacancy-summary__company-name">{`${vacancy.companyName}, ${vacancy.location}`}</div>
            <div className="vacancy-summary__salary">
              Зарплата: {vacancy.salary ? `${vacancy.salary} ₽` : 'не указана'}
            </div>
          </div>
        </div>
        <div class="vacancy-card__description">{vacancy.description}</div>
        <div class="vacancy-card__footer">
          <a
            class="vacancy-card__more-button button button_main-primary"
            href={resolveUrl('vacancy', { id: vacancy.id.toString() })}
          >
            Подробнее
          </a>
          <span class="vacancy-card__created-at">
            последнее обновление {vacancy.updatedAt.toLocaleDateString('ru-RU')}
          </span>
        </div>
      </article>
    );
  }
}
