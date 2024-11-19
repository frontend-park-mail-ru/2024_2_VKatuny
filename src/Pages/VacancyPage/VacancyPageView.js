import { ProfileMinicardView } from '@/Components/ProfileMinicard/ProfileMinicardView';
import { PageView } from '@/modules/Page/Page';
import VacancyPageHbs from './vacancy-page.hbs';
import { zip } from '@/modules/ObjectUtils/Zip';

export class VacancyPageView extends PageView {
  constructor(renderParams) {
    renderParams.isEmployer = !renderParams.isApplicant && renderParams.isAuthorized;
    super({
      template: VacancyPageHbs,
      renderParams: zip(renderParams, ProfileMinicardView.generateRenderParams()),
    });
    this.header = this._html.querySelector('.header');
    if (!renderParams.isEmployer) {
      this.profileMinicard = this._html.querySelector('.vacancy-page__profile-minicard');
    }
    this.vacancyContainer = this._html.querySelector('.vacancy-page__vacancy-container');
    this.sideColumn = this._html.querySelector('.vacancy-page__left-column');
  }

  addVacancyArticle(render) {
    this.vacancyContainer.innerHTML = '';
    this.vacancyContainer.appendChild(render);
  }

  addAppliersList(render) {
    this.sideColumn.appendChild(render);
    render.classList.remove('hidden');
  }
}
