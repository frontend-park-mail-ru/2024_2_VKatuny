import { resolveStatic } from '../UrlUtils/UrlUtils.js';

export class Vacancy {
  constructor(backendResponse) {
    this.id = backendResponse.id;
    this.employerId = backendResponse.employer;
    this.companyName = backendResponse.companyName;
    this.salary = backendResponse.salary;
    this.position = backendResponse.position;
    this.location = backendResponse.location;
    this.description = backendResponse.description;
    this.workType = backendResponse.workType;
    this.avatar = backendResponse.avatar || resolveStatic('img/company-icon.svg');
    this.createdAt = new Date(backendResponse.createdAt);
    this.updatedAt = new Date(backendResponse.updatedAt);
  }
}
