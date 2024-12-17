import { Router } from '@/application/components/router/router';
import * as vdom from '@/modules/vdom/virtual_dom';
import { LoginPage } from '@/application/pages/login_page/login_page';
import { resolveUrl } from '@/modules/common_utils/url_utils/url_utils';
import { NotificationBox } from '@/Components/NotificationBox/NotificationBox';
import { VacanciesPage } from '@/application/pages/vacancies_page/vacancies_page';
import './scss/index.scss';
import { storeManager } from '@/modules/store_manager/store_manager';
import { routerActionCreators } from '@/application/action_creators/router_action_creators';
import { VirtualDomRoot } from '@/modules/vdom/virtual_dom_root';
import { userActionCreators } from '@/application/action_creators/user_action_creators';
import { RegistrationPage } from '@/application/pages/registration_page/registration_page';
import { ProfilePage } from '@/application/pages/profile_page/profile_page';
import { VacancyPage } from './application/pages/vacancy_page/vacancy_page';
import { CvPage } from './application/pages/cv_page/cv_page';
import { CvEditPage } from './application/pages/cv_edit_page/cv_edit_page';
import { VacancyEditPage } from './application/pages/vacancy_edit_page/vacancy_edit_page';

// eslint-disable-next-line
const notificationBox = new NotificationBox({
  existingElement: document.querySelector('.notification-box'),
});

const appRoot = new VirtualDomRoot(document.getElementById('app'));

routerActionCreators.addRoute(resolveUrl('vacancies', null), VacanciesPage);
routerActionCreators.addRoute(resolveUrl('login', null), LoginPage);
routerActionCreators.addRoute(resolveUrl('register', null), RegistrationPage);
routerActionCreators.addRoute(resolveUrl('myProfile', null), ProfilePage);
routerActionCreators.addRoute(resolveUrl('profile', null), ProfilePage);
routerActionCreators.addRoute(resolveUrl('vacancy', null), VacancyPage);
routerActionCreators.addRoute(resolveUrl('cv', null), CvPage);
routerActionCreators.addRoute(resolveUrl('editCv', null), CvEditPage);
routerActionCreators.addRoute(resolveUrl('createCv', null), CvEditPage);
routerActionCreators.addRoute(resolveUrl('editVacancy', null), VacancyEditPage);
routerActionCreators.addRoute(resolveUrl('createVacancy', null), VacancyEditPage);
routerActionCreators.startRouting(new URL(location.href));

userActionCreators.isAuthorized().finally(() => {
  setInterval(
    () => {
      userActionCreators.isAuthorized();
    },
    1000 * 60 * 25,
  ); // 25 min
  storeManager.bindVirtualDom(appRoot);
  appRoot.render(<Router key="router" />);
});
