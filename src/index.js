import { Page } from './modules/Page/Page.js';
import { VacanciesPage } from './modules/VacanciesPage/VacanciesPage.js';
import { Router } from '/src/modules/Router/Router.js';
import { resolveStatic, resolveUrl } from './modules/UrlUtils/UrlUtils.js';
import { UserSession } from './modules/UserSession/UserSession.js';

Handlebars.registerHelper('static', resolveStatic);
Handlebars.registerHelper('url', resolveUrl);

Handlebars.registerPartial('header', Handlebars.templates['header.hbs']);

const userSession = new UserSession();
userSession.checkAuthorization().finally(() => {
  const router = new Router({userSession});
  router.addRoute('/', Page);
  router.addRoute('/vacancies', VacanciesPage);
  router.start();
});
