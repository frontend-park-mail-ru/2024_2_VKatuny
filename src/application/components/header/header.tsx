import * as vdom from '@/modules/vdom/virtual_dom';
import { Component, VirtualNodeSpec } from '@/modules/vdom/virtual_node';
import { userStore } from '@/application/stores/user_store/user_store';
import { resolveUrl } from '@/modules/common_utils/url_utils/url_utils';
import profileMenuIconSvg from '@static/img/profile-menu-icon.svg';
import notificationIconSvg from '@static/img/notification-icon-36.svg';
import menuIconSvg from '@static/img/menu-icon-48.svg';
import cvMenuIconSvg from '@static/img/cv-menu-icon.svg';
import vacancyMenuIconSvg from '@static/img/vacancy-menu-icon.svg';
import logoutMenuIconSvg from '@static/img/logout-menu-icon.svg';
import { Dropdown } from '@/application/components/dropdown/dropdown';
import { UserType } from '@/application/models/user-type';
import './header.scss';
import { userActionCreators } from '@/application/action_creators/user_action_creators';

export class Header extends Component {
  private isDropdownOpen: boolean;
  private setIsDropdownOpen: (newIsDropdownOpen: boolean) => void;
  constructor({ elementClass }: { elementClass?: string }) {
    super({ elementClass });
    this.isDropdownOpen = false;
    this.setIsDropdownOpen = (newIsDropdownOpen: boolean) => {
      this.isDropdownOpen = newIsDropdownOpen;
      this.domNode.virtualNode.root.update();
    };
  }

  render(): VirtualNodeSpec {
    const userData = userStore.getData();
    return (
      <nav className={`${this.props.elementClass} header`}>
        <a className="header__logo" href={resolveUrl('vacancies', null).toString()}>
          &mu;Art
        </a>
        {userData.isLoggedIn ? (
          <div className="header__authorized-container">
            <img className="header__notification-button" src={notificationIconSvg} />
            <img className="header__user-avatar" src={userData.userProfile.avatar} />
            <img
              className="header__menu-open-button"
              src={menuIconSvg}
              onClick={() => this.setIsDropdownOpen(!this.isDropdownOpen)}
            />
            <Dropdown
              key="dropdown"
              elementClass="header__dropdown"
              isOpen={this.isDropdownOpen}
              setIsOpen={this.setIsDropdownOpen}
            >
              <div className="header__user-info">
                <div className="header__user-name">
                  {userData.userProfile.firstName + ' ' + userData.userProfile.secondName}
                </div>
                <div className="header__user-type">{userData.russianUserType}</div>
              </div>
              <div className="header__dropdown-separator"></div>
              <div className="header__menu menu">
                <a
                  className="header__profile-button menu__element"
                  href={resolveUrl('myProfile', null).toString()}
                >
                  <img className="menu__element-icon" src={profileMenuIconSvg} />
                  Профиль пользователя
                </a>
                {userData.userType === UserType.Applicant ? (
                  <a
                    className="header__cv-button menu__element"
                    href={resolveUrl('myProfile', { from: 'cvList' }).toString()}
                  >
                    <img className="menu__element-icon" src={cvMenuIconSvg} />
                    Мои резюме
                  </a>
                ) : (
                  <a
                    className="header__vacancy-button menu__element"
                    href={resolveUrl('myProfile', { from: 'vacancyList' }).toString()}
                  >
                    <img className="menu__element-icon" src={vacancyMenuIconSvg} />
                    Мои вакансии
                  </a>
                )}
                <a
                  className="header__logout-button menu__element"
                  onClick={() => userActionCreators.logout()}
                >
                  <img className="menu__element-icon" src={logoutMenuIconSvg} />
                  Выйти
                </a>
              </div>
            </Dropdown>
          </div>
        ) : (
          <div className="header__not-authorized-container">
            <a
              className="header__login-button button button_main-primary"
              href={resolveUrl('login', null).toString()}
            >
              Вход
            </a>
            <a
              className="header__registration-button button button_main-secondary"
              href={resolveUrl('register', null).toString()}
            >
              Регистрация
            </a>
          </div>
        )}
      </nav>
    );
  }
}
