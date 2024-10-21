import router from '/src/modules/Router/Router.js';
import { resolveStatic, resolveUrl } from './modules/UrlUtils/UrlUtils.js';
import { UserSession } from './modules/UserSession/UserSession.js';
import { LoginPage } from './Pages/LoginPage/LoginPage.js';
import { RegistrationPage } from './Pages/RegistrationPage/RegistrationPage.js';

Handlebars.registerHelper('static', resolveStatic);
Handlebars.registerHelper('url', resolveUrl);

Handlebars.registerPartial('header', Handlebars.templates['header.hbs']);
Handlebars.registerPartial('login-form', Handlebars.templates['login-form.hbs']);
Handlebars.registerPartial('notification', Handlebars.templates['notification.hbs']);
Handlebars.registerPartial(
  'employer-registration-form',
  Handlebars.templates['employer-registration-form.hbs'],
);
Handlebars.registerPartial(
  'applicant-registration-form',
  Handlebars.templates['applicant-registration-form.hbs'],
);
Handlebars.registerPartial(
  'user-type-radiogroup',
  Handlebars.templates['user-type-radiogroup.hbs'],
);
Handlebars.registerPartial('validated-input', Handlebars.templates['validated-input.hbs']);
Handlebars.registerPartial('validated-textarea', Handlebars.templates['validated-textarea.hbs']);

export const userSession = new UserSession();
userSession.router = router;
// router.addRoute('/', VacanciesPage);
router.addRoute('/login', LoginPage);
router.addRoute('/registration', RegistrationPage);
userSession.checkAuthorization().finally(() => {
  router.start();
});
