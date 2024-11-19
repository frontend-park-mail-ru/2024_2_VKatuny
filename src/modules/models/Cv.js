import fallbackCompanyIcon from '@static/img/company-icon.svg';
export class Cv {
  constructor(backendResponse) {
    this.id = backendResponse.id;
    this.applicantId = backendResponse.applicant;
    this.positionRu = backendResponse.positionRu;
    this.positionEn = backendResponse.positionEn;
    this.description = backendResponse.description;
    this.jobSearchStatus = backendResponse.jobSearchStatus;
    this.workingExperience = backendResponse.workingExperience;
    this.avatar = backendResponse.avatar || fallbackCompanyIcon;
    this.createdAt = new Date(backendResponse.createdAt);
    this.updatedAt = new Date(backendResponse.updatedAt);
  }
}
