import { resolveStatic } from '../UrlUtils/UrlUtils.js';

export class Cv {
  constructor(backendResponse) {
    this.id = backendResponse.id;
    this.applicantId = backendResponse.applicant;
    this.positionRu = backendResponse.positionRu;
    this.positionEn = backendResponse.positionEn;
    this.description = backendResponse.description;
    this.jobSearchStatus = backendResponse.jobSearchStatus;
    this.workingExperience = backendResponse.workingExperience;
    this.avatar = backendResponse.avatar || resolveStatic('img/company-icon.svg');
    this.createdAt = new Date(backendResponse.createdAt);
    this.updatedAt = new Date(backendResponse.updatedAt);
  }
}
