import { ComponentModel } from '../../../modules/Components/Component.js';
import { Api } from '../../../modules/Api/Api.js';
import { Minicard } from '../../Minicard/Minicard.js';
import { resolveUrl } from '../../../modules/UrlUtils/UrlUtils.js';

export class ApplicantPortfolioListModel extends ComponentModel {
  #userId;
  #isOwner;
  constructor({ userId, isListOwner }) {
    super();
    this.#userId = userId;
    this.#isOwner = isListOwner;
  }

  getItems() {
    const portfolioJson = Api.getApplicantPortfolios({ id: this.#userId });
    const portfolioObjects = portfolioJson.reduce((portfolioObjects, portfolioJsonItem) => {
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
    }, []);
    return portfolioObjects;
  }
}
