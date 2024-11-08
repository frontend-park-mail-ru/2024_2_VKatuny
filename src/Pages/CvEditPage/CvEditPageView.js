import { PageView } from '../../modules/Page/Page.js';

export class CvEditPageView extends PageView {
  constructor(renderParams) {
    super({
      templateName: 'cv-page-edit.hbs',
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
