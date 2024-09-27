import { Page } from './modules/Page/Page.js';
import { Router } from '/src/modules/Router/Router.js';

const router = new Router();

router.addRoute('/', Page);
router.start();
