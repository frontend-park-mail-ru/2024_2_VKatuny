import { resolveStatic } from '../UrlUtils/UrlUtils.js';
export class Applicant {
  constructor(backendResponse) {
    this.id = backendResponse.id;
    this.firstName = backendResponse.firstName;
    this.secondName = backendResponse.lastName;
    this.city = backendResponse.city;
    this.birthDate = new Date(backendResponse.birthDate);
    this.avatar = backendResponse.pathToProfileAvatar || resolveStatic('img/user-icon-80.svg');
    this.contacts = backendResponse.contacts;
    this.education = backendResponse.education;
    this.email = backendResponse.email;
  }
}
