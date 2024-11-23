import router from '@/modules/Router/Router';
import eventBus from './modules/Events/EventBus';
import appState from './modules/AppState/AppState';
import { LoginPage } from './Pages/LoginPage/LoginPage';
import { RegistrationPage } from './Pages/RegistrationPage/RegistrationPage';
import { VacanciesPage } from './Pages/VacanciesPage/VacanciesPage';
import { ProfilePage } from './Pages/ProfilePage/ProfilePage';
import { VacancyPage } from './Pages/VacancyPage/VacancyPage';
import { VacancyEditPage } from './Pages/VacancyEditPage/VacancyEditPage';
import { resolveUrl } from './modules/UrlUtils/UrlUtils';
import { REDIRECT_TO, GO_TO } from './modules/Events/Events';
import { CvPage } from './Pages/CvPage/CvPage';
import { CvEditPage } from './Pages/CvEditPage/CvEditPage';
import { NotificationBox } from './Components/NotificationBox/NotificationBox';
import './scss/index.scss';
import { Iframe } from './Components/Iframe/Iframe';

// eslint-disable-next-line
const notificationBox = new NotificationBox({
  existingElement: document.querySelector('.notification-box'),
});

// eslint-disable-next-line
const surveyBox = new Iframe({
  surveyUrl: resolveUrl('survey', { form: 'csat' }),
  surveyTitle: 'Опрос',
  elementClass: 'app__survey-iframe',
});
document.querySelector('.app').after(surveyBox.render());

setInterval(() => {
  if (surveyBox.render().href === 'close') {
    surveyBox.cleanup();
  }
}, 500);

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
