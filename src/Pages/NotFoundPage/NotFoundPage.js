import { Page } from '../../modules/Page/Page.js';
import { NotFoundPageController } from './NotFoundPageController.js';
import { NotFoundPageModel } from './NotFoundPageModel.js';
import { NotFoundPageView } from './NotFoundPageView.js';

/** A class representing 404 not found page.
 * @extends Page
 */
export class NotFoundPage extends Page {
  /**
   * Create an instance of 404 Page.
   * @param {URL} url --- a URL object containing the link with which this page were navigated
   * @throws {TypeError} url is not an instance of URL
   */
  constructor({ url }) {
    super({
      url,
      modelClass: NotFoundPageModel,
      viewClass: NotFoundPageView,
      controllerClass: NotFoundPageController,
      viewParams: { url },
    });
  }
}
