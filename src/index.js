import router from '/src/modules/Router/Router.js';
import { resolveStatic, resolveUrl } from './modules/UrlUtils/UrlUtils.js';
import { UserSession } from './modules/UserSession/UserSession.js';
import { LoginPage } from './Pages/LoginPage/LoginPage.js';

Handlebars.registerHelper('static', resolveStatic);
Handlebars.registerHelper('url', resolveUrl);

Handlebars.registerPartial('header', Handlebars.templates['header.hbs']);
Handlebars.registerPartial('login-form', Handlebars.templates['login-form.hbs']);
Handlebars.registerPartial('notification', Handlebars.templates['notification.hbs']);
Handlebars.registerPartial('employer-form', Handlebars.templates['employer-form.hbs']);
Handlebars.registerPartial('applicant-form', Handlebars.templates['applicant-form.hbs']);
Handlebars.registerPartial(
  'user-type-radiogroup',
  Handlebars.templates['user-type-radiogroup.hbs'],
);
Handlebars.registerPartial('validated-input', Handlebars.templates['validated-input.hbs']);

export const userSession = new UserSession();
userSession.router = router;
// router.addRoute('/', VacanciesPage);
router.addRoute('/login', LoginPage);
// router.addRoute('/register', RegisterPage);
userSession.checkAuthorization().finally(() => {
  router.start();
});
