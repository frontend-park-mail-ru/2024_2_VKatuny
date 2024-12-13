import { ComponentModel } from '@/modules/Components/Component';
import { Minicard } from '@/Components/Minicard/Minicard';
import { resolveUrl } from '@/modules/common_utils/url_utils/url_utils';
import { Cv } from '@/modules/models/Cv';
import { CvPage } from '@/Pages/CvPage/CvPage';
import appState from '@/modules/AppState/AppState';
import { getApplicantCvs, deleteCv } from '@api/api';

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
    const cvsJson = await getApplicantCvs(appState.backendUrl, this.#userId);
    const cvsObjects = cvsJson.reduce((cvsObjects, cvJsonItem) => {
      try {
        const cv = new Cv(cvJsonItem);
        this.#items.push(cv);
        const urlSearchQuery = { [`${CvPage.CV_ID_PARAM}`]: cv.id };
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

  async removeChild(cvArrId) {
    if (cvArrId >= this.#items.length || cvArrId < 0) {
      return false;
    }
    const cv = this.#items[cvArrId];
    try {
      await deleteCv(appState.backendUrl, cv.id);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
