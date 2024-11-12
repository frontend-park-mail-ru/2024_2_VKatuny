import router from '@/modules/Router/Router.js';
import eventBus from './modules/Events/EventBus.js';
import appState from './modules/AppState/AppState.js';
import { LoginPage } from './Pages/LoginPage/LoginPage.js';
import { RegistrationPage } from './Pages/RegistrationPage/RegistrationPage.js';
import { VacanciesPage } from './Pages/VacanciesPage/VacanciesPage.js';
import { ProfilePage } from './Pages/ProfilePage/ProfilePage.js';
import { VacancyPage } from './Pages/VacancyPage/VacancyPage.js';
import { VacancyEditPage } from './Pages/VacancyEditPage/VacancyEditPage.js';
import { resolveUrl } from './modules/UrlUtils/UrlUtils';
import { REDIRECT_TO, GO_TO } from './modules/Events/Events.js';
import { CvPage } from './Pages/CvPage/CvPage.js';
import { CvEditPage } from './Pages/CvEditPage/CvEditPage.js';
import { NotificationBox } from './Components/NotificationBox/NotificationBox.js';
import './scss/index.scss';

// eslint-disable-next-line no-unused-vars
const notificationBox = new NotificationBox({
  existingElement: document.querySelector('.notification-box'),
});

router.addRoute(resolveUrl('vacancies', null).pathname, VacanciesPage);
router.addRoute(resolveUrl('login', null).pathname, LoginPage);
router.addRoute(resolveUrl('register', null).pathname, RegistrationPage);
router.addRoute(resolveUrl('myProfile', null).pathname, ProfilePage);
router.addRoute(resolveUrl('profile', null).pathname, ProfilePage);
router.addRoute(resolveUrl('vacancy', null).pathname, VacancyPage);
router.addRoute(resolveUrl('createVacancy', null).pathname, VacancyEditPage);
router.addRoute(resolveUrl('editVacancy', null).pathname, VacancyEditPage);
router.addRoute(resolveUrl('cv', null).pathname, CvPage);
router.addRoute(resolveUrl('createCv', null).pathname, CvEditPage);
router.addRoute(resolveUrl('editCv', null).pathname, CvEditPage);

eventBus.on(REDIRECT_TO, ({ redirectUrl }: { redirectUrl: URL }) => {
  router.navigate(redirectUrl, true, true);
});

eventBus.on(GO_TO, ({ redirectUrl }: { redirectUrl: URL }) => {
  router.navigate(redirectUrl, false, true);
});

appState.userSession.checkAuthorization().finally(() => {
  router.start();
});
