import { handlebarsInit } from '/src/modules/Handlebars/Handlebars.js';
import router from '/src/modules/Router/Router.js';
import appState from './modules/AppState/AppState.js';
import { LoginPage } from './Pages/LoginPage/LoginPage.js';
import { RegistrationPage } from './Pages/RegistrationPage/RegistrationPage.js';
import { VacanciesPage } from './Pages/VacanciesPage/VacanciesPage.js';

handlebarsInit();

router.addRoute('/', VacanciesPage);
router.addRoute('/login', LoginPage);
router.addRoute('/registration', RegistrationPage);

appState.userSession.checkAuthorization().finally(() => {
  router.start();
});
