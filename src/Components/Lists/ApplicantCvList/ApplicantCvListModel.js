import { ComponentModel } from '../../../modules/Components/Component.js';
import { Api } from '../../../modules/Api/Api.js';
import { Minicard } from '../../Minicard/Minicard.js';
import { resolveUrl } from '../../../modules/UrlUtils/UrlUtils.js';

export class ApplicantCvListModel extends ComponentModel {
  #userId;
  #isOwner;
  constructor({ userId, isListOwner }) {
    super();
    this.#userId = userId;
    this.#isOwner = isListOwner;
  }

  async getItems() {
    const cvsJson = await Api.getApplicantCvs({ id: this.#userId });
    const cvsObjects = cvsJson.reduce((cvsObjects, cvJsonItem) => {
      try {
        const { id, positionRu } = cvJsonItem;
        cvsObjects.push(
          new Minicard({
            renderParams: {
              elementClass: 'applicant-cv-list__minicard',
              title: positionRu,
              isCardOwner: this.#isOwner,
              editButtonUrl: resolveUrl(`/cv/edit/${id}`),
            },
          }),
        );
        return cvsObjects;
      } catch {
        return cvsObjects;
      }
    }, []);
    return cvsObjects;
  }
}
