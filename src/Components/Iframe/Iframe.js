import { Component, ComponentController, ComponentModel } from '@/modules/Components/Component';
import { IframeView } from './IframeView';

export class Iframe extends Component {
  constructor({ surveyUrl, surveyTitle, elementClass }) {
    super({
      modelClass: ComponentModel,
      controllerClass: ComponentController,
      viewClass: IframeView,
      viewParams: { iframeLocation: surveyUrl, iframeTitle: surveyTitle, elementClass },
    });
  }
}
