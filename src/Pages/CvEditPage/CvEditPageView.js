import { PageView } from '@/modules/Page/Page';
import CvPageEditHbs from './cv-page-edit.hbs';

export class CvEditPageView extends PageView {
  constructor(renderParams) {
    super({
      template: CvPageEditHbs,
      renderParams: renderParams,
    });
    this.header = this._html.querySelector('.header');
    this.formBox = this._html.querySelector('.cv-page-edit__form-container');
  }

  addCvForm(formRender) {
    this.cvForm = formRender;
    this.formBox.appendChild(formRender);
  }
}
