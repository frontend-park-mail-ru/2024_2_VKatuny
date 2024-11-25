import fallbackVacancyIcon from '@static/img/company-icon.svg';

export class Vacancy {
  constructor(backendResponse) {
    this.id = backendResponse.id;
    this.employerId = backendResponse.employer;
    this.companyName = backendResponse.companyName;
    this.salary = +backendResponse.salary;
    this.position = backendResponse.position;
    this.location = backendResponse.location;
    this.description = backendResponse.description;
    this.workType = backendResponse.workType;
    this.avatar = backendResponse.avatar || fallbackVacancyIcon;
    this.positionGroup = backendResponse.positionGroup;
    this.createdAt = new Date(backendResponse.createdAt);
    this.updatedAt = new Date(backendResponse.updatedAt);
  }
}
