import { Router } from '@/application/components/router/router';
import * as vdom from '@/modules/vdom/virtual_dom';
import { LoginPage } from '@/application/pages/login_page/login_page';
// import { RegistrationPage } from './Pages/RegistrationPage/RegistrationPage';
// import { ProfilePage } from './Pages/ProfilePage/ProfilePage';
// import { VacancyPage } from './Pages/VacancyPage/VacancyPage';
// import { VacancyEditPage } from './Pages/VacancyEditPage/VacancyEditPage';
import { resolveUrl } from '@/modules/common_utils/url_utils/url_utils';
// import { CvPage } from './Pages/CvPage/CvPage';
// import { CvEditPage } from './Pages/CvEditPage/CvEditPage';
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

// eslint-disable-next-line
const notificationBox = new NotificationBox({
  existingElement: document.querySelector('.notification-box'),
});

// router.addRoute(resolveUrl('myProfile', null).pathname, ProfilePage);
// router.addRoute(resolveUrl('profile', null).pathname, ProfilePage);
// router.addRoute(resolveUrl('vacancy', null).pathname, VacancyPage);
// router.addRoute(resolveUrl('createVacancy', null).pathname, VacancyEditPage);
// router.addRoute(resolveUrl('editVacancy', null).pathname, VacancyEditPage);
// router.addRoute(resolveUrl('cv', null).pathname, CvPage);
// router.addRoute(resolveUrl('createCv', null).pathname, CvEditPage);
// router.addRoute(resolveUrl('editCv', null).pathname, CvEditPage);

const appRoot = new VirtualDomRoot(document.getElementById('app'));

routerActionCreators.addRoute(resolveUrl('vacancies', null), VacanciesPage);
routerActionCreators.addRoute(resolveUrl('login', null), LoginPage);
routerActionCreators.addRoute(resolveUrl('register', null), RegistrationPage);
routerActionCreators.addRoute(resolveUrl('myProfile', null), ProfilePage);
routerActionCreators.addRoute(resolveUrl('profile', null), ProfilePage);
routerActionCreators.addRoute(resolveUrl('vacancy', null), VacancyPage);
routerActionCreators.startRouting(new URL(location.href));

userActionCreators.isAuthorized().finally(() => {
  storeManager.bindVirtualDom(appRoot);
  appRoot.render(<Router key="router" />);
});
