import { Component } from '@/modules/vdom/virtual_node';
import * as vdom from '@/modules/vdom/virtual_dom';
import { cvStore } from '@/application/stores/cv_store/cv_store';
import { cvActionCreators } from '@/application/action_creators/cv_action_creators';
import { profileActionCreators } from '@/application/action_creators/profile_action_creators';
import { UserType } from '@/application/models/user-type';
import { profileStore } from '@/application/stores/profile_store/profile_store';
import { PageContainer } from '@/application/components/page_container/page_container';
import { NotFoundPage } from '../not_found_page/not_found_page';
import { LoadingScreen } from '@/application/components/loading_screen/loading_screen';
import { userStore } from '@/application/stores/user_store/user_store';
import { ProfileMinicard } from '@/application/components/profile_minicard/profile_minicard';
import { Applicant } from '@/application/models/applicant';
import { CvArticle } from '@/application/components/cv_article/cv_article';
import './cv_page.scss';

export enum CvPageParams {
  id = 'id',
}

export class CvPage extends Component {
  private lastUrl: URL;
  private failedToLoadCv: boolean = false;
  private invokedLoadingCv: boolean = false;
  private invokedLoadingProfile: boolean = false;

  constructor({ url }: { url: URL }) {
    super({ url });
    this.parseUrl();
  }

  didUpdate(): void {
    super.didUpdate();
    this.parseUrl();
  }

  private parseUrl(): void {
    const url = this.props.url as URL;
    if (this.lastUrl === url) {
      return;
    }
    const cvId = Number(url.searchParams.get(CvPageParams.id));
    if (!cvId) {
      this.failedToLoadCv = true;
      return;
    }
    const cvData = cvStore.getData();
    const cvSuccessfullyLoaded = cvData.loadedCv && cvData.cv && cvData.cv.id === cvId;
    if (!cvSuccessfullyLoaded && !this.invokedLoadingCv) {
      cvActionCreators.loadCv(cvId).then(() => {
        const cv = cvStore.getData().cv;
        this.invokedLoadingProfile = true;
        if (!cv) {
          return;
        }
        profileActionCreators.loadProfile(UserType.Applicant, cv.applicantId);
      });
      this.invokedLoadingCv = true;
    }
    this.lastUrl = url;
  }

  render() {
    const cvData = cvStore.getData();
    const profileData = profileStore.getData();
    if (!cvData.loadedCv || !profileData.profileLoaded) {
      return (
        <PageContainer key="page-container" elementClass="cv-page__page-container">
          <LoadingScreen key="loading-screen" />
        </PageContainer>
      );
    }
    if (this.failedToLoadCv || !cvData.cv || !profileData.userProfile) {
      return <NotFoundPage url={this.props.url} key="not-found-page" />;
    }
    this.invokedLoadingCv = false;
    this.invokedLoadingProfile = false;
    const cv = cvData.cv;
    const userData = userStore.getData();
    const userType = userData.userType;
    const userProfile = profileStore.getData().userProfile as Applicant;
    const isOwner = userType === UserType.Applicant && userData.id === cv.applicantId;
    return (
      <PageContainer key="page-container" elementClass="cv-page__page-container">
        <div className="cv-page">
          <main className="cv-page__cv-container">
            <CvArticle
              key="cv-article"
              elementClass="cv-page__cv-article"
              cv={cv}
              userType={userType}
              isOwner={isOwner}
            />
          </main>
          <div className="cv-page__side-column">
            <ProfileMinicard
              key="profile-minicard"
              elementClass="cv-page__profile-minicard"
              city={userProfile.city}
              fullName={`${userProfile.firstName} ${userProfile.secondName}`}
              contacts={userProfile.contacts}
            />
          </div>
        </div>
      </PageContainer>
    );
  }
}
