import { ComponentModel } from '@/modules/Components/Component';
import { getVacancyAppliers } from '@api/api';
import appState from '@/modules/AppState/AppState';
import { Applicant } from '@/modules/models/Applicant';
import { catchStandardResponseError } from '@/modules/app_errors/Errors';

export class AppliersListModel extends ComponentModel {
  #vacancyId;
  constructor({ vacancyId }) {
    super();
    this.#vacancyId = vacancyId;
  }

  async getItems() {
    try {
      const peopleJson = (await getVacancyAppliers(appState.backendUrl, this.#vacancyId))
        .subscribers;
      const applicantObjects = peopleJson.reduce((applicantObjects, applicantJsonItem) => {
        try {
          const applicant = new Applicant(applicantJsonItem);
          applicant.name = `${applicant.firstName} ${applicant.secondName}`;
          applicantObjects.push(applicant);
          return applicantObjects;
        } catch {
          return applicantObjects;
        }
      }, []);
      return applicantObjects;
    } catch (err) {
      catchStandardResponseError(err);
    }
  }
}
