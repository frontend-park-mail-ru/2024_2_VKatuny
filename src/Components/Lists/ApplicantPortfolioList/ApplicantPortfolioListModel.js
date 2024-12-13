import { ComponentModel } from '@/modules/Components/Component';
import { Api } from '@/modules/api/Api';
import { Minicard } from '@/Components/Minicard/Minicard';
import { resolveUrl } from '@/modules/common_utils/url_utils/url_utils';

export class ApplicantPortfolioListModel extends ComponentModel {
  #userId;
  #isOwner;
  constructor({ userId, isListOwner }) {
    super();
    this.#userId = userId;
    this.#isOwner = isListOwner;
  }

  async getItems() {
    const portfolioJson = await Api.getApplicantPortfolios({ id: this.#userId });
    const portfolioObjects = portfolioJson.reduce((portfolioObjects, portfolioJsonItem) => {
      try {
        const { id, name } = portfolioJsonItem;
        portfolioObjects.push(
          new Minicard({
            renderParams: {
              elementClass: 'applicant-portfolio-list__minicard',
              title: name,
              isCardOwner: this.#isOwner,
              editButtonUrl: resolveUrl(`/portfolio/edit/${id}`),
            },
          }),
        );
        return portfolioObjects;
      } catch {
        return portfolioObjects;
      }
    }, []);
    return portfolioObjects;
  }
}
