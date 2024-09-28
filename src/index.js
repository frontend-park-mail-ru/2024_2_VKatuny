import { Page } from './modules/Page/Page.js';
import { VacanciesPage } from './modules/VacanciesPage/VacanciesPage.js';
import { Router } from '/src/modules/Router/Router.js';
import { resolveStatic, resolveUrl } from './modules/UrlUtils/UrlUtils.js';

/* global Handlebars */

Handlebars.registerHelper('static', resolveStatic);
Handlebars.registerHelper('url', resolveUrl);

Handlebars.registerPartial('header', Handlebars.templates['header.hbs']);

const router = new Router();
router.addRoute('/', Page);
router.addRoute('/vacancies', VacanciesPage);
router.start();
