import { Component } from '@/modules/vdom/virtual_node';
import * as vdom from '@/modules/vdom/virtual_dom';
import { Cv } from '@/application/models/cv';
import './cv_article.scss';
import { UserType } from '@/application/models/user-type';
import { resolveUrl } from '@/modules/common_utils/url_utils/url_utils';
import { cvActionCreators } from '@/application/action_creators/cv_action_creators';
import { profileActionCreators } from '@/application/action_creators/profile_action_creators';
import { routerActionCreators } from '@/application/action_creators/router_action_creators';
import {
  ProfilePageParams,
  ProfilePageStartingFrames,
} from '@/application/pages/profile_page/profile_page';
import IconPdf from '@static/img/icon-pdf-50.png';

export interface CvArticleProps {
  elementClass: string;
  cv: Cv;
  userType: UserType;
  isOwner: boolean;
}

export class CvArticle extends Component {
  constructor({ elementClass, cv, userType, isOwner }: CvArticleProps) {
    super({ elementClass, cv, userType, isOwner });
  }

  private handleDelete = async (ev: Event) => {
    ev.preventDefault();
    const cv = this.props.cv as Cv;
    try {
      await cvActionCreators.removeCv(cv.id);
      await profileActionCreators.loadProfile(UserType.Applicant, cv.applicantId);
      routerActionCreators.navigate(
        resolveUrl('myProfile', {
          [ProfilePageParams.StartFrame]: ProfilePageStartingFrames.CvList,
        }),
      );
    } catch {}
  };
  render() {
    const cv = this.props.cv as Cv;
    const userType = this.props.userType;
    const isOwner = this.props.isOwner;
    return (
      <article className={`${this.props.elementClass} cv-article`}>
        <div className="cv-article__header-container">
          <div className="cv-article__header">
            <h1 className="cv-article__header-text">{`${cv.positionRu} / ${cv.positionEn}`}</h1>
            <div className="cv-article__job-search-status-container">
              <span className="cv-article__job-search-status pill pill_main">
                {cv.jobSearchStatus}
              </span>
              <button
                type="button"
                onClick={() => {
                  cvActionCreators.loadPdf(cv.id);
                }}
                className="cv-article__pdf-button"
              >
                <img src={IconPdf} className="cv-article__pdf-picture" />
                Скачать PDF
              </button>
            </div>
          </div>
        </div>
        <div className="cv-article__divider"></div>
        <h2 className="cv-article__description-header">Описание и достижения</h2>
        <div className="cv-article__description">{cv.description}</div>
        <div className="cv-article__divider"></div>
        <h2 className="cv-article__working-experience-header">Опыт работы</h2>
        <div className="cv-article__working-experience">{cv.workingExperience}</div>
        {userType === UserType.Employer ? (
          <div className="cv-article__button-container">
            <a
              className="cv-article__another-button button button_main-secondary"
              href={`${resolveUrl('profile', null)}?id=${cv.applicantId}&userType=applicant&from=cvList`}
            >
              Все резюме
            </a>

            <div className="cv-article__created-at">
              {`последнее обновление: ${cv.updatedAt.toLocaleString('ru-RU')}`}
            </div>
          </div>
        ) : (
          isOwner && (
            <div className="cv-article__button-container">
              <a
                className="cv-article__edit-button button button_main-primary"
                href={`${resolveUrl('editCv', null)}?id=${cv.id}`}
              >
                Изменить
              </a>
              <button
                type="button"
                className="cv-article__delete-button button button_danger-secondary"
                onClick={(ev: Event) => this.handleDelete(ev)}
              >
                Удалить
              </button>

              <div className="cv-article__created-at">
                {`последнее обновление: ${cv.updatedAt.toLocaleString('ru-RU')}`}
              </div>
            </div>
          )
        )}
      </article>
    );
  }
}
