import { PageView } from '@/modules/Page/Page';
import VacancyPageEditHbs from './vacancy-page-edit.hbs';

export class VacancyEditPageView extends PageView {
  constructor(renderParams) {
    renderParams.isEmployer = !renderParams.isApplicant && renderParams.isAuthorized;
    super({
      template: VacancyPageEditHbs,
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
