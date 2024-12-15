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
  constructor({ url }: { url: URL }) {
    super({ url });
    this.parseUrl();
    this.activeFrameIdx = 0;
    this.setActiveFrameIdx = (frameIdx: number) => {
      this.activeFrameIdx = frameIdx;
      this.domNode.virtualNode.root.update();
    };
  }

  didUpdate(): void {
    super.didUpdate();
    this.parseUrl();
  }

  parseUrl() {
    const url = this.props.url as URL;
    const userData = userStore.getData();
    if (url.pathname === resolveUrl('myProfile', null).pathname) {
      this.userId = userData.id;
      this.userType = userData.userType;
      this.isMyProfile = true;
    } else {
      this.userId = Number(url.searchParams.get(ProfilePageParams.UserId));
      this.userType = url.searchParams.get(ProfilePageParams.UserType) as UserType;
      this.isMyProfile = userData.id === this.userId;
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
  }

  render() {
    const userData = userStore.getData();
    if (this.isMyProfile && !userData.isLoggedIn) {
      routerActionCreators.redirect(resolveUrl('login', null));
      return <div>{false}</div>;
    }
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
              canUpdate={true}
            >
              <Profile
                key="profile"
                elementClass="profile-page__profile"
                userType={this.userType}
                userProfile={userData.userProfile}
              />
              <ProfileForm key="profile-form" elementClass="profile-page__profile-form" />
            </ReadUpdateFormBox>
            <div>Hello2</div>
          </FrameSeries>
          <ProfileMinicard
            elementClass="profile-page__profile-minicard"
            fullName="Иван Иванов"
            city="Москва"
            contacts="@tg: hello"
            key="profile-minicard"
          />
        </div>
      </PageContainer>
    );
  }
}
