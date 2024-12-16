import { Component } from '@/modules/vdom/virtual_node';
import * as vdom from '@/modules/vdom/virtual_dom';
import { PageContainer } from '@/application/components/page_container/page_container';
import { ProfileMinicard } from '@/application/components/profile_minicard/profile_minicard';
import { userStore } from '@/application/stores/user_store/user_store';
import { UserType } from '@/application/models/user-type';
import { VacancyArticle } from '@/application/components/vacancy_article/vacancy_article';
import { vacancyStore } from '@/application/stores/vacancy_store/vacancy_store';
import { LoadingScreen } from '@/application/components/loading_screen/loading_screen';
import { NotFoundPage } from '../not_found_page/not_found_page';
import { vacancyActionCreators } from '@/application/action_creators/vacancy_action_creators';
import { profileStore } from '@/application/stores/profile_store/profile_store';
import { profileActionCreators } from '@/application/action_creators/profile_action_creators';
import './vacancy_page.scss';
import { AppliersList } from '@application/components/appliers_list/appliers_list';

export enum VacancyPageParams {
  VacancyId = 'id',
}

export class VacancyPage extends Component {
  private lastUrl: URL;
  private failedToLoadVacancy: boolean = false;
  private invokedLoadingVacancy: boolean = false;
  private invokedLoadingProfile: boolean = false;
  constructor({ url }: { url: URL }) {
    super({ url });
    this.parseUrl();
  }

  didUpdate() {
    super.didUpdate();
    this.parseUrl();
  }

  private parseUrl() {
    const url = this.props.url as URL;
    if (this.lastUrl === url) {
      return;
    }
    const vacancyId = Number(url.searchParams.get(VacancyPageParams.VacancyId));
    if (!vacancyId) {
      this.failedToLoadVacancy = true;
      return;
    }
    const vacancyData = vacancyStore.getData();
    const vacancySuccessfullyLoaded =
      vacancyData.loadedVacancy && vacancyData.vacancy && vacancyData.vacancy.id === vacancyId;
    if (!vacancySuccessfullyLoaded && !this.invokedLoadingVacancy) {
      vacancyActionCreators.loadVacancy(vacancyId).then(() => {
        const vacancy = vacancyStore.getData().vacancy;
        this.invokedLoadingProfile = true;
        if (!vacancy) {
          return;
        }
        profileActionCreators.loadProfile(UserType.Employer, vacancy.employerId);
      });
      if (userStore.getData().userType === UserType.Applicant) {
        vacancyActionCreators.loadApplyStatus(vacancyId);
        vacancyActionCreators.loadFavoriteStatus(vacancyId);
      }
      this.invokedLoadingVacancy = true;
    }
    this.lastUrl = this.props.url as URL;
  }

  render() {
    const vacancyData = vacancyStore.getData();
    const profileData = profileStore.getData();
    if (!vacancyData.loadedVacancy || !profileData.profileLoaded) {
      return (
        <PageContainer key="page-container" elementClass="vacancy-page__page-container">
          <LoadingScreen key="loading-screen" />
        </PageContainer>
      );
    }
    if (this.failedToLoadVacancy || !vacancyData.vacancy || !profileData.userProfile) {
      return <NotFoundPage url={this.props.url} key="not-found-page" />;
    }
    this.invokedLoadingVacancy = false;
    this.invokedLoadingProfile = false;
    const vacancy = vacancyData.vacancy;
    const appliers = vacancyData.appliers ?? false;
    const userData = userStore.getData();
    const employer = profileStore.getData().userProfile;
    const userType = userData.userType;
    const isOwner = userType === UserType.Employer && vacancy.employerId === userData.id;
    return (
      <PageContainer key="page-container" elementClass="vacancy-page__page-container">
        <div className="vacancy-page" key="vacancy-page">
          <main className="vacancy-page__vacancy-container">
            <VacancyArticle
              key="vacancy-article"
              elementClass="vacancy-page__vacancy-article"
              vacancy={vacancy}
              userType={userType}
              isOwner={isOwner}
              isApplied={vacancyData.applied}
              isFavorite={vacancyData.favorite}
            />
          </main>
          <div className="vacancy-page__side-column">
            {userType !== UserType.Employer && (
              <ProfileMinicard
                key="profile-minicard"
                elementClass="vacancy-page__profile-minicard"
                fullName={`${employer.firstName} ${employer.secondName}`}
                city={employer.city}
                contacts={employer.contacts}
              />
            )}
            {userType === UserType.Employer && isOwner && (
              <AppliersList
                key="appliers-list"
                elementClass="vacancy-page__appliers-list"
                appliers={appliers}
              />
            )}
          </div>
        </div>
      </PageContainer>
    );
  }
}
