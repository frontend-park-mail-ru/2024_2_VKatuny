import { Component } from '@/modules/vdom/virtual_node';
import * as vdom from '@/modules/vdom/virtual_dom';
import { resolveUrl } from '@/modules/common_utils/url_utils/url_utils';
import { Input, Option } from '@/application/components/input/input';
import './cv_edit_page.scss';
import { cvActionCreators } from '@/application/action_creators/cv_action_creators';
import { cvStore } from '@/application/stores/cv_store/cv_store';
import { LoadingScreen } from '@/application/components/loading_screen/loading_screen';
import { NotFoundPage } from '../not_found_page/not_found_page';
import { routerActionCreators } from '@/application/action_creators/router_action_creators';
import { userStore } from '@/application/stores/user_store/user_store';
import { PageContainer } from '@/application/components/page_container/page_container';

export enum CvEditPageParams {
  Id = 'id',
}

export class CvEditPage extends Component {
  private lastUrl: URL;
  private failedToLoadCv: boolean = false;
  private isCreatingCv: boolean = false;
  private cvId?: number;
  private invokedLoadingCv: boolean = false;
  private jobSearchStatusOptions: Array<Option> = [
    { value: 'Активно ищу работу', label: 'Активно ищу работу' },
    { value: 'Не ищу работу', label: 'Не ищу работу' },
  ];

  constructor({ url }: { url: URL }) {
    super({ url });
    this.parseUrl();
    if (this.isCreatingCv) {
      cvActionCreators.clearCv();
    }
  }

  didUpdate(): void {
    super.didUpdate();
    this.parseUrl();
  }

  private parseUrl(): void {
    const url = this.props.url as URL;
    this.isCreatingCv = url.pathname === resolveUrl('createCv', null).pathname;
    if (!this.isCreatingCv) {
      if (this.lastUrl === url) {
        return;
      }
      this.cvId = Number(url.searchParams.get(CvEditPageParams.Id));
      if (!this.cvId) {
        this.failedToLoadCv = true;
        return;
      }
      const cvData = cvStore.getData();
      const cvSuccessfullyLoaded = cvData.loadedCv && cvData.cv && cvData.cv.id === this.cvId;
      if (!cvSuccessfullyLoaded && !this.invokedLoadingCv) {
        cvActionCreators.loadCv(this.cvId);
        this.invokedLoadingCv = true;
      } else {
        if (this.invokedLoadingCv) {
          this.failedToLoadCv = true;
        }
      }
      this.lastUrl = url;
    }
  }

  private handleSubmit = async (ev: Event) => {
    ev.preventDefault();
    const formData = Object.fromEntries(new FormData(ev.target as HTMLFormElement));
    try {
      if (this.isCreatingCv) {
        await cvActionCreators.createCv(formData);
        const cv = cvStore.getData().cv;
        routerActionCreators.redirect(
          resolveUrl('cv', { [CvEditPageParams.Id]: cv.id.toString() }),
        );
      } else {
        await cvActionCreators.updateCv(this.cvId, formData);
        routerActionCreators.redirect(
          resolveUrl('cv', { [CvEditPageParams.Id]: this.cvId.toString() }),
        );
      }
      // TODO: handle error
    } catch {}
  };

  handleFocusOut = (ev: Event) => {
    const target = ev.target as HTMLInputElement;
    const name = target.name;
    const value = target.value;
    cvActionCreators.submitCvFields({ [name]: value });
  };

  render() {
    const userData = userStore.getData();
    if (!userData.isLoggedIn) {
      routerActionCreators.redirect(resolveUrl('login', null));
      return <div>{false}</div>;
    }
    const formData = cvStore.getData().cvFormData;
    if (!this.isCreatingCv) {
      const cvData = cvStore.getData();
      if (!cvData.loadedCv) {
        return (
          <PageContainer key="page-container" elementClass="profile-page__page-container">
            <LoadingScreen key="loading-screen" />
          </PageContainer>
        );
      }
      if (this.failedToLoadCv || !cvData.cv) {
        return <NotFoundPage url={this.props.url} key="not-found-page" />;
      }
    }
    const cvData = cvStore.getData().cv;
    return (
      <PageContainer key="page-container" elementClass="cv-edit-page__page-container">
        <main className="cv-edit-page cv-edit-page_theme-dark">
          <h2 className="cv-edit-page__header">
            {this.isCreatingCv ? 'Создание резюме' : 'Редактирование резюме'}
          </h2>
          <form
            className="cv-edit-page__form"
            method="POST"
            novalidate
            onSubmit={(ev: Event) => {
              this.handleSubmit(ev);
            }}
          >
            <Input
              key="input-position-ru"
              elementClass="cv-edit-page__position-ru"
              id="position-ru"
              name="positionRu"
              type="text"
              label="Должность"
              placeholder="Актер"
              isRequired={true}
              maxlength={50}
              onFocusOut={this.handleFocusOut}
              value={
                (formData && formData.positionRu && formData.positionRu.value) ||
                (cvData && cvData.positionRu)
              }
              isValid={formData && formData.positionRu && formData.positionRu.isValid}
              error={formData && formData.positionRu && formData.positionRu.errorMsg}
            />
            <Input
              key="input-position-en"
              elementClass="cv-edit-page__position-en"
              id="position-en"
              name="positionEn"
              type="text"
              label="Перевод должности на английский"
              placeholder="Actor"
              isRequired={true}
              maxlength={50}
              onFocusOut={this.handleFocusOut}
              value={
                (formData && formData.positionEn && formData.positionEn.value) ||
                (cvData && cvData.positionEn)
              }
              isValid={formData && formData.positionEn && formData.positionEn.isValid}
              error={formData && formData.positionEn && formData.positionEn.errorMsg}
            />
            <Input
              key="input-job-search-status"
              type="select"
              label="Статус поиска работы"
              options={this.jobSearchStatusOptions}
              elementClass="cv-edit-page__job-search-status"
              id="job-search-status"
              name="jobSearchStatus"
              isRequired={true}
              onFocusOut={this.handleFocusOut}
              value={
                (formData && formData.jobSearchStatus && formData.jobSearchStatus.value) ||
                (cvData && cvData.jobSearchStatus)
              }
              isValid={formData && formData.jobSearchStatus && formData.jobSearchStatus.isValid}
              error={formData && formData.jobSearchStatus && formData.jobSearchStatus.errorMsg}
            />
            <Input
              key="input-description"
              type="textarea"
              hasResizeVertical={true}
              elementClass="cv-edit-page__description"
              id="description"
              name="description"
              label="Описание и достижения"
              placeholder="Расскажите о себе"
              isRequired={true}
              maxlength={500}
              onFocusOut={this.handleFocusOut}
              value={
                (formData && formData.description && formData.description.value) ||
                (cvData && cvData.description)
              }
              isValid={formData && formData.description && formData.description.isValid}
              error={formData && formData.description && formData.description.errorMsg}
            />
            <Input
              key="input-working-experience"
              type="textarea"
              hasResizeVertical={true}
              elementClass="cv-edit-page__working-experience"
              id="working-experience"
              name="workingExperience"
              label="Опыт работы"
              placeholder="Расскажите о своем опыте работы"
              isRequired={true}
              maxlength={500}
              onFocusOut={this.handleFocusOut}
              value={
                (formData && formData.workingExperience && formData.workingExperience.value) ||
                (cvData && cvData.workingExperience)
              }
              isValid={formData && formData.workingExperience && formData.workingExperience.isValid}
              error={formData && formData.workingExperience && formData.workingExperience.errorMsg}
            />
            <div className="cv-edit-page__button-container">
              {this.isCreatingCv ? (
                <button
                  type="submit"
                  className="cv-edit-page__submit-button button button_main-primary"
                >
                  Создать
                </button>
              ) : (
                <button
                  type="submit"
                  className="cv-edit-page__submit-button button button_main-primary"
                >
                  Сохранить
                </button>
              )}
              <a
                className="cv-form__cancel-button button button_main-secondary"
                href={resolveUrl('myProfile', { from: 'cvList' })}
              >
                В профиль
              </a>
            </div>
          </form>
        </main>
      </PageContainer>
    );
  }
}
