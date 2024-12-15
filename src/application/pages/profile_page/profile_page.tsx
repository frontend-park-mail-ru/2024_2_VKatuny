import { Component } from '@/modules/vdom/virtual_node';
import * as vdom from '@/modules/vdom/virtual_dom';
import { ProfileMinicard } from '@/application/components/profile_minicard/profile_minicard';
import { resolveUrl } from '@/modules/common_utils/url_utils/url_utils';
import { UserType } from '@/application/models/user-type';
import { userStore } from '@/application/stores/user_store/user_store';
import { routerActionCreators } from '@/application/action_creators/router_action_creators';
import { FrameSeries } from '@/application/components/frame_series/frame_series';
import { PageContainer } from '@/application/components/page_container/page_container';
import './profile_page.scss';
import { ReadUpdateFormBox } from '@/application/components/read_update_form_box/read_update_form_box';
import { Profile } from '@/application/components/profile/profile';
import { ProfileForm } from '@/application/components/profile_form/profile_form';
import { profileStore } from '@/application/stores/profile_store/profile_store';
import { LoadingScreen } from '@/application/components/loading_screen/loading_screen';
import { NotFoundPage } from '../not_found_page/not_found_page';
import { profileActionCreators } from '@/application/action_creators/profile_action_creators';
import { ItemList } from '@/application/components/item_list/item_list';

export enum ProfilePageParams {
  UserId = 'id',
  UserType = 'userType',
  StartFrame = 'from',
}

export enum ProfilePageStartingFrames {
  Profile = 'profile',
  CvList = 'cvList',
  PortfolioList = 'portfolioList',
  VacancyList = 'vacancyList',
}

export class ProfilePage extends Component {
  private isMyProfile: boolean;
  private userId: number;
  private userType: UserType;
  private startFrom: ProfilePageStartingFrames;
  private activeFrameIdx: number;
  private setActiveFrameIdx: (frameIdx: number) => void;
  private isUpdatingProfile: boolean = false;
  private setIsUpdatingProfile: (isUpdatingProfile: boolean) => void;
  private failedToLoadProfile: boolean = false;
  private lastUrl: URL;

  private invokedLoadingProfile: boolean;
  constructor({ url }: { url: URL }) {
    super({ url });
    this.parseUrl();
    this.lastUrl = url;

    this.invokedLoadingProfile = false;
    this.setActiveFrameIdx = (frameIdx: number) => {
      this.activeFrameIdx = frameIdx;
      this.domNode.virtualNode.root.update();
    };
    this.setIsUpdatingProfile = (isUpdatingProfile: boolean) => {
      this.isUpdatingProfile = isUpdatingProfile;
      this.domNode.virtualNode.root.update();
    };
  }

  didUpdate(): void {
    super.didUpdate();
    this.parseUrl();
    this.lastUrl = this.props.url as URL;
  }

  parseUrl() {
    if (this.lastUrl === this.props.url) {
      return;
    }
    const url = this.props.url as URL;
    const userData = userStore.getData();
    if (url.pathname === resolveUrl('myProfile', null).pathname) {
      this.userId = userData.id;
      this.userType = userData.userType;
      this.isMyProfile = true;
    } else {
      this.userId = Number(url.searchParams.get(ProfilePageParams.UserId));
      this.userType = url.searchParams.get(ProfilePageParams.UserType) as UserType;
      if (this.userType !== UserType.Applicant && this.userType !== UserType.Employer) {
        this.failedToLoadProfile = true;
      }
      this.isMyProfile = userData.id === this.userId && userData.userType === this.userType;
    }
    const profileData = profileStore.getData();
    if (
      (!profileData.profileLoaded ||
        !profileData.userProfile ||
        profileData.userProfile.id !== this.userId ||
        profileData.userType !== this.userType) &&
      !this.invokedLoadingProfile
    ) {
      profileActionCreators.loadProfile(this.userType, this.userId);
      this.invokedLoadingProfile = true;
    } else {
      if (this.invokedLoadingProfile) {
        this.failedToLoadProfile = true;
      }
    }

    switch (url.searchParams.get(ProfilePageParams.StartFrame)) {
      case ProfilePageStartingFrames.CvList: {
        this.startFrom =
          this.userType === UserType.Applicant
            ? ProfilePageStartingFrames.CvList
            : ProfilePageStartingFrames.Profile;
        break;
      }
      case ProfilePageStartingFrames.PortfolioList: {
        this.startFrom =
          this.userType === UserType.Applicant
            ? ProfilePageStartingFrames.PortfolioList
            : ProfilePageStartingFrames.Profile;
        break;
      }
      case ProfilePageStartingFrames.VacancyList: {
        this.startFrom =
          this.userType === UserType.Employer
            ? ProfilePageStartingFrames.VacancyList
            : ProfilePageStartingFrames.Profile;
        break;
      }
      default: {
        this.startFrom = ProfilePageStartingFrames.Profile;
      }
    }

    switch (this.startFrom) {
      case ProfilePageStartingFrames.CvList: {
        this.activeFrameIdx = 1;
        break;
      }
      case ProfilePageStartingFrames.PortfolioList: {
        this.activeFrameIdx = 2;
        break;
      }
      case ProfilePageStartingFrames.VacancyList: {
        this.activeFrameIdx = 1;
        break;
      }
      default: {
        this.activeFrameIdx = 0;
        break;
      }
    }
  }

  render() {
    if (this.isMyProfile) {
      const userData = userStore.getData();
      if (!userData.isLoggedIn) {
        routerActionCreators.redirect(resolveUrl('login', null));
        return <div>{false}</div>;
      }
    }
    const profileData = profileStore.getData();
    if (!profileData.profileLoaded) {
      return (
        <PageContainer key="page-container" elementClass="profile-page__page-container">
          <LoadingScreen key="loading-screen" />
        </PageContainer>
      );
    }
    if (this.failedToLoadProfile || !profileData.userProfile) {
      return <NotFoundPage url={this.props.url} key="not-found-page" />;
    }
    const userProfile = profileData.userProfile;
    this.invokedLoadingProfile = false;
    const profileForm = profileData.profileForm;
    const cvList = profileData.cvList;
    const vacancyList = profileData.vacancyList;
    return (
      <PageContainer key="page-container" elementClass="profile-page__page-container">
        <div class="profile-page" key="profile-page">
          <FrameSeries
            key="frame-series"
            elementClass="profile-page__frame-series"
            activeFrameIndex={this.activeFrameIdx}
            setActiveFrameIndex={(idx: number) => this.setActiveFrameIdx(idx)}
            childrenLabels={
              this.userType === UserType.Applicant ? ['Профиль', 'Резюме'] : ['Профиль', 'Вакансии']
            }
          >
            <ReadUpdateFormBox
              key="read-update-form-box"
              elementClass="profile-page__read-update-form-box"
              canUpdate={this.isMyProfile}
              isUpdating={this.isUpdatingProfile}
              setIsUpdating={this.setIsUpdatingProfile}
              formId="profile-form"
            >
              <Profile
                key="profile"
                elementClass="profile-page__profile"
                userType={this.userType}
                userProfile={userProfile}
              />
              <ProfileForm
                key="profile-form"
                elementClass="profile-page__profile-form"
                userType={this.userType}
                onSubmit={(ev: Event) => {
                  ev.preventDefault();
                  const formData = Object.fromEntries(new FormData(ev.target as HTMLFormElement));
                  profileActionCreators
                    .updateProfile(this.userType, formData)
                    .then((ok: boolean) => {
                      this.setIsUpdatingProfile(!ok);
                    });
                }}
                onReset={(ev: Event) => {
                  ev.preventDefault();
                  profileActionCreators.clearProfileForm();
                  this.setIsUpdatingProfile(false);
                }}
                formData={profileForm}
              />
            </ReadUpdateFormBox>
            {this.userType === UserType.Applicant ? (
              <ItemList
                key="cv-list"
                elementClass="profile-page__cv-list"
                isOwner={this.isMyProfile}
                addHref={resolveUrl('createCv', null)}
                childData={
                  cvList &&
                  cvList.map((cv) => {
                    return {
                      title: cv.positionRu + ' / ' + cv.positionEn,
                      goToLink: resolveUrl('cv', { id: cv.id.toString() }),
                      editLink: resolveUrl('editCv', { id: cv.id.toString() }),
                      isOwner: this.isMyProfile,
                      handleDelete: () => {
                        console.log('handleDelete');
                      },
                    };
                  })
                }
              />
            ) : (
              <ItemList
                key="vacancy-list"
                elementClass="profile-page__vacancy-list"
                isOwner={this.isMyProfile}
                addHref={resolveUrl('createVacancy', null)}
                childData={
                  vacancyList &&
                  vacancyList.map((vacancy) => {
                    return {
                      title: vacancy.position,
                      goToLink: resolveUrl('vacancy', { id: vacancy.id.toString() }),
                      editLink: resolveUrl('editVacancy', { id: vacancy.id.toString() }),
                      isOwner: this.isMyProfile,
                      handleDelete: () => {
                        console.log('handleDelete');
                      },
                    };
                  })
                }
              />
            )}
          </FrameSeries>
          <ProfileMinicard
            elementClass="profile-page__profile-minicard"
            fullName={`${userProfile.firstName} ${userProfile.secondName}`}
            city={userProfile.city}
            contacts={userProfile.contacts}
            key="profile-minicard"
          />
        </div>
      </PageContainer>
    );
  }
}
