import { ComponentModel } from '../../../modules/Components/Component.js';
import { Api } from '../../../modules/Api/Api.js';
import { Minicard } from '../../Minicard/Minicard.js';
import { resolveUrl } from '../../../modules/UrlUtils/UrlUtils.js';
import { Cv } from '../../../modules/models/Cv.js';
import { CvPage } from '../../../Pages/CvPage/CvPage.js';

export class ApplicantCvListModel extends ComponentModel {
  #userId;
  #isOwner;
  #items;
  constructor({ userId, isListOwner }) {
    super();
    this.#userId = userId;
    this.#isOwner = isListOwner;
    this.#items = [];
  }

  async getItems() {
    const cvsJson = await Api.getApplicantCvs({ id: this.#userId });
    const cvsObjects = cvsJson.reduce((cvsObjects, cvJsonItem) => {
      try {
        const cv = new Cv(cvJsonItem);
        this.#items.push(cv);
        const urlSearchQuery = {};
        urlSearchQuery[`${CvPage.CV_ID_PARAM}`] = cv.id;
        cvsObjects.push(
          new Minicard({
            renderParams: {
              elementClass: 'applicant-cv-list__minicard',
              title: cv.positionRu,
              isCardOwner: this.#isOwner,
              goToLink: resolveUrl('cv', urlSearchQuery),
              editButtonUrl: resolveUrl('editCv', urlSearchQuery),
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
