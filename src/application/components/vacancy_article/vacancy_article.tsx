import { Component } from '@/modules/vdom/virtual_node';
import * as vdom from '@/modules/vdom/virtual_dom';
import './vacancy_article.scss';
import { Vacancy } from '@/application/models/vacancy';
import { UserType } from '@/application/models/user-type';
import { resolveUrl } from '@/modules/common_utils/url_utils/url_utils';
import { vacancyActionCreators } from '@/application/action_creators/vacancy_action_creators';
import { routerActionCreators } from '@/application/action_creators/router_action_creators';
import {
  ProfilePageParams,
  ProfilePageStartingFrames,
} from '@/application/pages/profile_page/profile_page';
import { profileActionCreators } from '@/application/action_creators/profile_action_creators';

export interface VacancyArticleProps {
  elementClass: string;
  vacancy: Vacancy;
  userType: UserType;
  isOwner: boolean;
  isApplied: boolean;
}

export class VacancyArticle extends Component {
  constructor({ elementClass, vacancy, userType, isOwner, isApplied }: VacancyArticleProps) {
    super({ elementClass, vacancy, userType, isOwner, isApplied });
  }

  private handleDelete = async (ev: Event) => {
    ev.preventDefault();
    const vacancy = this.props.vacancy as Vacancy;
    try {
      await vacancyActionCreators.removeVacancy(vacancy.id);
      await profileActionCreators.loadProfile(this.props.userType as UserType, vacancy.employerId);
      routerActionCreators.navigate(
        resolveUrl('myProfile', {
          [ProfilePageParams.StartFrame]: ProfilePageStartingFrames.VacancyList,
        }),
      );
    } catch {}
  };

  private handleApply = async (ev: Event) => {
    ev.preventDefault();
    vacancyActionCreators.applyVacancy((this.props.vacancy as Vacancy).id);
  };

  private handleRemoveApply = async (ev: Event) => {
    ev.preventDefault();
    vacancyActionCreators.removeApplyVacancy((this.props.vacancy as Vacancy).id);
  };

  render() {
    const vacancy = this.props.vacancy as Vacancy;
    return (
      <article className={`${this.props.elementClass} vacancy-article`}>
        <div className="vacancy-article__header-container">
          <img className="vacancy-article__company-picture" src={vacancy.avatar} />
          <div className="vacancy-article__header vacancy-summary">
            <h1 className="vacancy-summary__header">{vacancy.position}</h1>
            <div className="vacancy-summary__company-name">{vacancy.companyName}</div>
            <div key="span-box">
              <span className="vacancy-summary__salary">
                {vacancy.salary ? vacancy.salary.toString() + ' ₽' : ''}
              </span>
              <span className="vacancy-summary__work-type pill pill_main">{vacancy.workType}</span>
            </div>
          </div>
        </div>
        <div className="vacancy-article__divider"></div>
        <div className="vacancy-article__description">{vacancy.description}</div>
        {this.props.userType === UserType.Applicant && (
          <div className="vacancy-article__button-container">
            {this.props.isApplied ? (
              <button
                type="button"
                className="vacancy-article__reset-apply-button button button_danger-primary"
                onClick={(ev: Event) => this.handleRemoveApply(ev)}
              >
                Отменить отклик
              </button>
            ) : (
              <button
                type="button"
                className="vacancy-article__apply-button button button_main-primary"
                onClick={(ev: Event) => this.handleApply(ev)}
              >
                Откликнуться
              </button>
            )}

            <a
              className="vacancy-article__all-vacancies-button button button_main-secondary"
              href={
                resolveUrl('profile', null) +
                `?id=${vacancy.employerId}&userType=employer&from=vacancyList`
              }
            >
              Все вакансии
            </a>
            <div className="vacancy-article__created-at">
              {`последнее обновление: ${vacancy.createdAt.toLocaleString('ru-RU')}`}
            </div>
          </div>
        )}
        {this.props.userType === UserType.Employer && this.props.isOwner && (
          <div className="vacancy-article__button-container">
            <a
              className="vacancy-article__edit-button button button_main-primary"
              href={resolveUrl('editVacancy', null) + `?vacancyId=${vacancy.id}`}
            >
              Изменить
            </a>
            <button
              type="button"
              className="vacancy-article__delete-button button button_danger-secondary"
              onClick={(ev: Event) => this.handleDelete(ev)}
            >
              Удалить
            </button>
            <div className="vacancy-article__created-at">
              {`последнее обновление: ${vacancy.createdAt.toLocaleString('ru-RU')}`}
            </div>
          </div>
        )}
      </article>
    );
  }
}
