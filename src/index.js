import { handlebarsInit } from '/src/modules/Handlebars/Handlebars.js';
import router from '/src/modules/Router/Router.js';
import eventBus from './modules/Events/EventBus.js';
import appState from './modules/AppState/AppState.js';
import { LoginPage } from './Pages/LoginPage/LoginPage.js';
import { RegistrationPage } from './Pages/RegistrationPage/RegistrationPage.js';
import { VacanciesPage } from './Pages/VacanciesPage/VacanciesPage.js';
import { ProfilePage } from './Pages/ProfilePage/ProfilePage.js';
import { VacancyPage } from './Pages/VacancyPage/VacancyPage.js';
import { VacancyEditPage } from './Pages/VacancyEditPage/VacancyEditPage.js';
import { resolveUrl } from './modules/UrlUtils/UrlUtils.js';
import { REDIRECT_TO, GO_TO } from './modules/Events/Events.js';
import { CvPage } from './Pages/CvPage/CvPage.js';

handlebarsInit();

router.addRoute(resolveUrl('vacancies').pathname, VacanciesPage);
router.addRoute(resolveUrl('login').pathname, LoginPage);
router.addRoute(resolveUrl('register').pathname, RegistrationPage);
router.addRoute(resolveUrl('myProfile').pathname, ProfilePage);
router.addRoute(resolveUrl('profile').pathname, ProfilePage);
router.addRoute(resolveUrl('vacancy').pathname, VacancyPage);
router.addRoute(resolveUrl('createVacancy').pathname, VacancyEditPage);
router.addRoute(resolveUrl('editVacancy').pathname, VacancyEditPage);
router.addRoute(resolveUrl('cv').pathname, CvPage);

eventBus.on(REDIRECT_TO, ({ redirectUrl }) => {
  router.navigate(redirectUrl, true, true);
});

eventBus.on(GO_TO, ({ redirectUrl }) => {
  router.navigate(redirectUrl, false, true);
});

appState.userSession.checkAuthorization().finally(() => {
  router.start();
});
