import { PageView } from '../../modules/Page/Page.js';
import NotFoundPageHtml from './not-found-page.hbs';

export class NotFoundPageView extends PageView {
  constructor({ url }) {
    super({ renderParams: { notFoundUrl: url }, template: NotFoundPageHtml });
  }
}
