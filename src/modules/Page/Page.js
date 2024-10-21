import {
  Component,
  ComponentController,
  ComponentModel,
  ComponentView,
} from '../Components/Component.js';

/** Base class representing browser page */
export class Page extends Component {
  /**
   *
   * @param {URL} url --- a URL object containing the link with which this page were navigated
   * @throws {TypeError} url is not an instance of URL
   */
  constructor({
    modelClass,
    modelParams,
    viewClass,
    viewParams,
    controllerClass,
    controllerParams,
    url,
  }) {
    super({
      modelClass,
      modelParams,
      viewClass,
      viewParams,
      controllerClass,
      controllerParams,
    });
    if (!(url instanceof URL)) {
      throw TypeError('url must be a URL instance');
    }
    this._url = url;
  }

  postRenderInit() {}

  render() {
    return this._view.render();
  }
}

export const PageView = ComponentView;
export const PageController = ComponentController;
export const PageModel = ComponentModel;
