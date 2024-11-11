import { ComponentView } from '/src/modules/Components/Component.js';
import eventBus from '/src/modules/Events/EventBus.js';
import { USER_WANTS_LOGOUT } from '../../modules/Events/Events.js';
import state from '../../modules/AppState/AppState.js';
import USER_TYPE from '@/modules/UserSession/UserType.js';
import { addEventListeners } from '../../modules/Events/EventUtils.js';
import HeaderHbs from './header.hbs';
import profileMenuIconSvg from '@static/img/profile-menu-icon.svg';
import notificationIconSvg from '@static/img/notification-icon-36.svg';
import menuIconSvg from '@static/img/menu-icon-48.svg';
import cvMenuIconSvg from '@static/img/cv-menu-icon.svg';
import vacancyMenuIconSvg from '@static/img/vacancy-menu-icon.svg';
import logoutMenuIconSvg from '@static/img/logout-menu-icon.svg';

export class HeaderView extends ComponentView {
  #logoutButton;
  #openDropdownButton;
  #dropdown;
  #dropdownShown;

  constructor({ userType, userAuthenticated, userFullName, isApplicant }, existingElement) {
    super({
      renderParams: {
        userType,
        userAuthenticated,
        userFullName,
        isApplicant,
        profileMenuIcon: profileMenuIconSvg,
        notificationIcon: notificationIconSvg,
        menuIcon: menuIconSvg,
        cvMenuIcon: cvMenuIconSvg,
        vacancyMenuIcon: vacancyMenuIconSvg,
        logoutMenuIcon: logoutMenuIconSvg,
        avatar: state.userSession.avatar,
      },
      existingElement,
      templateName: HeaderHbs,
    });
    this.#dropdown = this._html.querySelector('.header__dropdown');
    this.#openDropdownButton = this._html.querySelector('.header__menu-open-button');
    if (this.#dropdown) {
      this.#dropdownShown = true;
      this.toggleDropdown();
      this._eventListeners.push(
        {
          object: window,
          event: 'click',
          listener: function (ev) {
            if (!this.#dropdownShown || Object.is(ev.target, this.#openDropdownButton)) {
              return;
            }
            const clickedInsideDropdown =
              this.#dropdown.contains(ev.target) || Object.is(this.#dropdown, ev.target);
            if (!clickedInsideDropdown) {
              this.toggleDropdown();
            }
          }.bind(this),
        },
        {
          object: this.#openDropdownButton,
          event: 'click',
          listener: this.toggleDropdown.bind(this),
        },
      );
    }
    this.#logoutButton = this._html.querySelector('.header__logout-button');
    if (this.#logoutButton) {
      this._eventListeners.push({
        object: this.#logoutButton,
        event: 'click',
        listener: (ev) => {
          ev.preventDefault();
          eventBus.emit(USER_WANTS_LOGOUT);
        },
      });
    }
    addEventListeners(this._eventListeners);
  }

  toggleDropdown() {
    if (this.#dropdownShown) {
      this.#dropdown.style.visibility = 'hidden';
    } else {
      this.#dropdown.style.visibility = 'visible';
    }
    this.#dropdownShown = !this.#dropdownShown;
  }
  static getViewParams() {
    return {
      userAuthenticated: state.userSession.isLoggedIn,
      userType: state.userSession.russianUserType,
      isApplicant: state.userSession.userType === USER_TYPE.APPLICANT,
      userFullName: state.userSession.getUserFullName(),
      profileMenuIcon: profileMenuIconSvg,
      notificationIcon: notificationIconSvg,
      menuIcon: menuIconSvg,
      cvMenuIcon: cvMenuIconSvg,
      vacancyMenuIcon: vacancyMenuIconSvg,
      logoutMenuIcon: logoutMenuIconSvg,
      avatar: state.userSession.avatar,
    };
  }
}
