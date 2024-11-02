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

  getItems() {
    const cvsJson = Api.getApplicantCvs({ id: this.#userId });
    const cvsObjects = cvsJson.reduce((cvsObjects, cvJsonItem) => {
      const { id, positionRus } = cvJsonItem;
      cvsObjects.push(
        new Minicard({
          renderParams: {
            elementClass: 'applicant-cv-list__minicard',
            title: positionRus,
            isCardOwner: this.#isOwner,
            editButtonUrl: resolveUrl(`/cv/edit/${id}`),
          },
        }),
      );
      return cvsObjects;
    }, []);
    return cvsObjects;
  }
}
