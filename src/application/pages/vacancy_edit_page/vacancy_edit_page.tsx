import { Component } from '@/modules/vdom/virtual_node';
import * as vdom from '@/modules/vdom/virtual_dom';
import { vacancyActionCreators } from '@/application/action_creators/vacancy_action_creators';
import { resolveUrl } from '@/modules/common_utils/url_utils/url_utils';
import { vacancyStore } from '@/application/stores/vacancy_store/vacancy_store';
import { routerActionCreators } from '@/application/action_creators/router_action_creators';
import { userStore } from '@/application/stores/user_store/user_store';
import { PageContainer } from '@/application/components/page_container/page_container';
import { LoadingScreen } from '@/application/components/loading_screen/loading_screen';
import { NotFoundPage } from '../not_found_page/not_found_page';
import { Input, Option } from '@/application/components/input/input';
import vacancySearchOptions from '@/config/vacancy_search.json';
import './vacancy_edit_page.scss';

export enum VacancyEditPageParams {
  Id = 'id',
}

export class VacancyEditPage extends Component {
  private lastUrl: URL;
  private failedToLoadVacancy: boolean = false;
  private isCreatingVacancy: boolean = false;
  private vacancyId?: number;
  private invokedLoadingVacancy: boolean = false;
  private workTypeOptions: Array<Option> = [
    { value: 'Постоянная', label: 'Постоянная' },
    { value: 'Временная', label: 'Временная' },
    { value: 'Разовая', label: 'Разовая' },
  ];

  constructor({ url }: { url: URL }) {
    super({ url });
    this.parseUrl();
    if (this.isCreatingVacancy) {
      vacancyActionCreators.clearVacancy();
    }
  }

  private parseUrl(): void {
    const url = this.props.url as URL;
    this.isCreatingVacancy = url.pathname === resolveUrl('createVacancy', null).pathname;
    if (!this.isCreatingVacancy) {
      if (this.lastUrl === url) {
        return;
      }
      this.vacancyId = Number(url.searchParams.get(VacancyEditPageParams.Id));
      if (!this.vacancyId) {
        this.failedToLoadVacancy = true;
        return;
      }
      const vacancyData = vacancyStore.getData();
      const vacancySuccessfullyLoaded =
        vacancyData.loadedVacancy &&
        vacancyData.vacancy &&
        vacancyData.vacancy.id === this.vacancyId;
      if (!vacancySuccessfullyLoaded && !this.invokedLoadingVacancy) {
        vacancyActionCreators.loadVacancy(this.vacancyId);
        this.invokedLoadingVacancy = true;
      } else {
        if (this.invokedLoadingVacancy) {
          this.failedToLoadVacancy = true;
        }
      }
      this.lastUrl = url;
    }
  }

  private handleSubmit = async (ev: Event) => {
    ev.preventDefault();
    const formData = Object.fromEntries(new FormData(ev.target as HTMLFormElement));
    try {
      if (this.isCreatingVacancy) {
        await vacancyActionCreators.createVacancy(formData);
        const vacancy = vacancyStore.getData().vacancy;
        routerActionCreators.redirect(
          resolveUrl('vacancy', { [VacancyEditPageParams.Id]: vacancy.id.toString() }),
        );
      } else {
        await vacancyActionCreators.updateVacancy(this.vacancyId, formData);
        routerActionCreators.redirect(
          resolveUrl('vacancy', { [VacancyEditPageParams.Id]: this.vacancyId.toString() }),
        );
      }
      // TODO: handle error
    } catch {}
  };

  handleFocusOut = (ev: Event) => {
    const target = ev.target as HTMLInputElement;
    const name = target.name;
    const value = target.value;
    vacancyActionCreators.submitVacancyFields({ [name]: value });
  };

  render() {
    const userData = userStore.getData();
    if (!userData.isLoggedIn) {
      routerActionCreators.redirect(new URL(resolveUrl('login', null)));
      return <div>{false}</div>;
    }
    const formData = vacancyStore.getData().vacancyFormData;
    if (!this.isCreatingVacancy) {
      const vacancyData = vacancyStore.getData();
      if (!vacancyData.loadedVacancy) {
        return (
          <PageContainer key="page-container" elementClass="profile-page__page-container">
            <LoadingScreen key="loading-screen" />
          </PageContainer>
        );
      }
      if (this.failedToLoadVacancy || !vacancyData.vacancy) {
        return <NotFoundPage url={this.props.url} key="not-found-page" />;
      }
    }
    const vacancyData = vacancyStore.getData().vacancy;
    return (
      <PageContainer key="page-container" elementClass="vacancy-edit-page__page-container">
        <main className="vacancy-edit-page vacancy-edit-page_theme-dark" key="vacancy-edit-page">
          <h2 className="vacancy-edit-page__header">
            {this.isCreatingVacancy ? 'Создание вакансии' : 'Редактирование вакансии'}
          </h2>
          <form
            className="vacancy-edit-page__form"
            method="POST"
            novalidate
            onSubmit={(ev: Event) => this.handleSubmit(ev)}
          >
            <Input
              key="input-position"
              elementClass="vacancy-edit-page__position"
              id="position"
              type="text"
              name="position"
              label="Должность"
              placeholder="Режиссер"
              isRequired={true}
              maxlength={50}
              value={
                (formData && formData.position && formData.position.value) ||
                (vacancyData && vacancyData.position)
              }
              isValid={formData && formData.position && formData.position.isValid}
              error={formData && formData.position && formData.position.errorMsg}
              onFocusOut={this.handleFocusOut}
            />
            <Input
              key="input-salary"
              elementClass="vacancy-edit-page__salary"
              id="salary"
              type="numeric"
              name="salary"
              label="Заработная плата (в руб.)"
              isRequired={true}
              maxlength={50}
              onFocusOut={this.handleFocusOut}
              value={
                (formData && formData.salary && formData.salary.value) ||
                (vacancyData && vacancyData.salary)
              }
              isValid={formData && formData.salary && formData.salary.isValid}
              error={formData && formData.salary && formData.salary.errorMsg}
            />
            <Input
              key="input-work-type"
              elementClass="vacancy-edit-page__work-type"
              id="work-type"
              label="Вид работы"
              type="select"
              name="workType"
              isRequired={true}
              onFocusOut={this.handleFocusOut}
              options={this.workTypeOptions}
              value={
                (formData && formData.workType && formData.workType.value) ||
                (vacancyData && vacancyData.workType)
              }
              isValid={formData && formData.workType && formData.workType.isValid}
              error={formData && formData.workType && formData.workType.errorMsg}
            />
            <Input
              key="input-location"
              elementClass="vacancy-edit-page__location"
              id="location"
              type="text"
              name="location"
              label="Город, где нужно будет работать"
              isRequired={true}
              onFocusOut={this.handleFocusOut}
              value={
                (formData && formData.location && formData.location.value) ||
                (vacancyData && vacancyData.location)
              }
              isValid={formData && formData.location && formData.location.isValid}
              error={formData && formData.location && formData.location.errorMsg}
            />
            <Input
              key="input-description"
              elementClass="vacancy-edit-page__description"
              id="description"
              type="textarea"
              name="description"
              label="Описание вакансии"
              isRequired={true}
              onFocusOut={this.handleFocusOut}
              value={
                (formData && formData.description && formData.description.value) ||
                (vacancyData && vacancyData.description)
              }
              isValid={formData && formData.description && formData.description.isValid}
              error={formData && formData.description && formData.description.errorMsg}
            />
            <Input
              key="input-position-group"
              elementClass="vacancy-edit-page__group"
              id="position-group"
              type="select"
              name="positionGroup"
              label="Категория"
              onFocusOut={this.handleFocusOut}
              options={vacancySearchOptions.searchGroupOptions}
              value={
                (formData && formData.positionGroup && formData.positionGroup.value) ||
                (vacancyData && vacancyData.positionGroup)
              }
              isValid={formData && formData.positionGroup && formData.positionGroup.isValid}
              error={formData && formData.positionGroup && formData.positionGroup.errorMsg}
            />
            <div class="vacancy-edit-page__button-container">
              {this.isCreatingVacancy ? (
                <button
                  type="submit"
                  className="vacancy-edit-page__submit-button button button_main-primary"
                >
                  Создать
                </button>
              ) : (
                <button
                  type="submit"
                  className="vacancy-edit-page__submit-button button button_main-primary"
                >
                  Сохранить
                </button>
              )}
              <a
                class="vacancy-edit-page__go-back-button button button_danger-tertiary"
                href={resolveUrl('myProfile', { from: 'vacancyList' })}
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
