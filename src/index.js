import { Page } from './modules/Page/Page.js';
import { VacanciesPage } from './modules/VacanciesPage/VacanciesPage.js';
import { Router } from '/src/modules/Router/Router.js';

Handlebars.registerPartial('header-authorized', Handlebars.templates['header-authorized.hbs']);
Handlebars.registerPartial('header-unauthorized', Handlebars.templates['header-unauthorized.hbs']);

const router = new Router();
router.addRoute('/', Page);
router.addRoute('/vacancies', VacanciesPage);
router.start();
