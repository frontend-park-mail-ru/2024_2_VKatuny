import { ComponentModel } from '@/modules/Components/Component';
import { Api } from '@/modules/Api/Api';
import { Applicant } from '@/modules/models/Applicant';
import { catchStandardResponseError } from '@/modules/Api/Errors';

export class AppliersListModel extends ComponentModel {
  #vacancyId;
  constructor({ vacancyId }) {
    super();
    this.#vacancyId = vacancyId;
  }

  async getItems() {
    try {
      const peopleJson = (await Api.getAppliersByVacancyId({ id: this.#vacancyId })).subscribers;
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
