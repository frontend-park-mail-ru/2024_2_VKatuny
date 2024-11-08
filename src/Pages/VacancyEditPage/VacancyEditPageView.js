import { PageView } from '../../modules/Page/Page.js';

export class VacancyEditPageView extends PageView {
  constructor(renderParams) {
    renderParams.isEmployer = !renderParams.isApplicant && renderParams.isAuthorized;
    super({
      templateName: 'vacancy-page-edit.hbs',
      renderParams: renderParams,
    });
    this.header = this._html.querySelector('.header');
    this.formBox = this._html.querySelector('.vacancy-page-edit__form-container');
  }

  addVacancyForm(formRender) {
    this.vacancyForm = formRender;
    this.formBox.appendChild(formRender);
  }
}
