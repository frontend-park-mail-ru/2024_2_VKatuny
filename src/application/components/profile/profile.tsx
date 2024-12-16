import { Component } from '@/modules/vdom/virtual_node';
import * as vdom from '@/modules/vdom/virtual_dom';
import { UserType } from '@/application/models/user-type';
import { Applicant } from '@application/models/applicant';
import { Employer } from '@application/models/employer';
import { LabeledField } from '../labeled_field/labeled_field';
import './profile.scss';

export interface ProfileProps {
  elementClass: string;
  userType: UserType;
  userProfile: Applicant | Employer;
}

export class Profile extends Component {
  constructor({ elementClass, userType, userProfile }: ProfileProps) {
    super({ elementClass, userType, userProfile });
  }

  render() {
    const userProfile =
      this.props.userType === UserType.Applicant
        ? (this.props.userProfile as Applicant)
        : (this.props.userProfile as Employer);
    return this.props.userType === UserType.Applicant ? (
      <div className={`${this.props.elementClass} profile`}>
        <LabeledField
          key="first-name"
          elementClass="profile__first-name"
          label="Имя"
          field={userProfile.firstName}
        />
        <LabeledField
          key="second-name"
          elementClass="profile__second-name"
          label="Фамилия"
          field={userProfile.secondName}
        />
        <LabeledField
          key="birthdate"
          elementClass="profile__birthdate"
          label="Дата рождения"
          field={(userProfile as Applicant).birthDate.toLocaleDateString('ru-RU')}
        />
        <LabeledField
          key="education"
          elementClass="profile__education"
          label="Образование"
          field={(userProfile as Applicant).education}
        />
      </div>
    ) : (
      <div className={`${this.props.elementClass} profile`}>
        <LabeledField
          key="first-name"
          elementClass="profile__first-name"
          label="Имя"
          field={userProfile.firstName}
        />
        <LabeledField
          key="second-name"
          elementClass="profile__second-name"
          label="Фамилия"
          field={userProfile.secondName}
        />
        <LabeledField
          key="position"
          elementClass="profile__position"
          label="Должность"
          field={(userProfile as Employer).position}
        />
        <LabeledField
          key="company-name"
          elementClass="profile__company-name"
          label="Компания"
          field={(userProfile as Employer).companyName}
        />
        <LabeledField
          key="company-description"
          elementClass="profile__company-description"
          label="Описание компании"
          field={(userProfile as Employer).companyDescription}
        />
        <LabeledField
          key="company-website"
          elementClass="profile__company-website"
          label="Сайт компании"
          field={(userProfile as Employer).companyWebsite}
        />
      </div>
    );
  }
}
