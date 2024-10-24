import { PageView } from '../../modules/Page/Page.js';

export class NotFoundPageView extends PageView {
  constructor({ url }) {
    super({ renderParams: { notFoundUrl: url }, templateName: 'not-found-page.hbs' });
  }
}
