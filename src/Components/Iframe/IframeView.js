import { ComponentView } from '@/modules/Components/Component';
import IframeHbs from './iframe.hbs';

export class IframeView extends ComponentView {
  constructor(renderParams, existingElement) {
    super({
      renderParams,
      existingElement,
      template: IframeHbs,
    });
  }

  hide() {
    this._html.classList.add('hidden');
  }

  show() {
    this._html.classList.remove('hidden');
  }
}
