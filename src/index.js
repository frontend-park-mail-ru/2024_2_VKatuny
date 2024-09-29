import { Page } from './modules/Page/Page.js';
import { LoginPage } from './modules/LoginPage/LoginPage.js';
import { RegisterPage } from './modules/RegisterPage/RegisterPage.js';
import { VacanciesPage } from './modules/VacanciesPage/VacanciesPage.js';
import { Router } from '/src/modules/Router/Router.js';
import { resolveStatic, resolveUrl } from './modules/UrlUtils/UrlUtils.js';
import { UserSession } from './modules/UserSession/UserSession.js';

Handlebars.registerHelper('static', resolveStatic);
Handlebars.registerHelper('url', resolveUrl);

Handlebars.registerPartial('header', Handlebars.templates['header.hbs']);
Handlebars.registerPartial('login-form', Handlebars.templates['login-form.hbs']);
Handlebars.registerPartial('notification', Handlebars.templates['notification.hbs']);
Handlebars.registerPartial('employer-form', Handlebars.templates['employer-form.hbs']);
Handlebars.registerPartial('applicant-form', Handlebars.templates['applicant-form.hbs']);

export const userSession = new UserSession();
export const router = new Router({ userSession });
userSession.router = router;
router.addRoute('/', Page);
router.addRoute('/vacancies', VacanciesPage);
router.addRoute('/login', LoginPage);
router.addRoute('/register', RegisterPage);
userSession.checkAuthorization().finally(() => {
  router.start();
});
