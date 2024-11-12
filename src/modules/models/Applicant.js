import fallbackUserAvatar from '@static/img/user-icon-80.svg';
export class Applicant {
  constructor(backendResponse) {
    this.id = backendResponse.id;
    this.firstName = backendResponse.firstName;
    this.secondName = backendResponse.lastName || backendResponse.secondName;
    this.city = backendResponse.city;
    this.birthDate = new Date(backendResponse.birthDate);
    this.avatar = backendResponse.pathToProfileAvatar || fallbackUserAvatar;
    this.contacts = backendResponse.contacts;
    this.education = backendResponse.education;
    this.email = backendResponse.email;
  }
}
