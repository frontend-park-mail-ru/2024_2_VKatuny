import { Component } from '@/modules/vdom/virtual_node';
import * as vdom from '@/modules/vdom/virtual_dom';
import { Input } from '@/application/components/input/input';
import { UserType } from '@/application/models/user-type';

export interface ProfileFormProps {
  elementClass: string;
  userType: UserType;
}

export class ProfileForm extends Component {
  constructor({ elementClass, userType }: ProfileFormProps) {
    super({ elementClass, userType });
  }
  render() {
    return this.props.userType === UserType.Applicant ? (
      <form
        className={`${this.props.elementClass} profile-form`}
        id="profile-form"
        method="POST"
        novalidate
      >
        <Input
          key="input-first-name"
          elementClass="profile-form__first-name"
          id="first-name"
          label="Имя"
          name="firstName"
          type="text"
          isRequired={true}
          maxlength={50}
        />
        <Input
          key="input-second-name"
          elementClass="profile-form__second-name"
          id="second-name"
          label="Фамилия"
          name="secondName"
          type="text"
          isRequired={true}
          maxlength={50}
        />
        <Input
          key="input-city"
          elementClass="profile-form__city"
          id="city"
          label="Город"
          name="city"
          type="text"
          isRequired={true}
          maxlength={50}
        />
        <Input
          key="input-education"
          elementClass="profile-form__education"
          id="education"
          label="Образование"
          name="education"
          type="textarea"
          maxlength={500}
        />
        <Input
          key="input-birthdate"
          elementClass="profile-form__birthdate"
          id="birthDate"
          label="Дата рождения"
          name="birthDate"
          type="date"
          isRequired={true}
          maxlength={50}
        />
        <Input
          key="input-contacts"
          elementClass="profile-form__contacts"
          id="contacts"
          label="Контакты"
          name="contacts"
          type="textarea"
          maxlength={500}
        />
      </form>
    ) : (
      <form
        className={`${this.props.elementClass} profile-form`}
        id="profile-form"
        method="POST"
        novalidate
      >
        <Input
          key="input-first-name"
          elementClass="profile-form__first-name"
          id="first-name"
          label="Имя"
          name="firstName"
          type="text"
          isRequired={true}
          maxlength={50}
        />
        <Input
          key="input-second-name"
          elementClass="profile-form__second-name"
          id="second-name"
          label="Фамилия"
          name="secondName"
          type="text"
          isRequired={true}
          maxlength={50}
        />
        <Input
          key="input-city"
          elementClass="profile-form__city"
          id="city"
          label="Город"
          name="city"
          type="text"
          isRequired={true}
          maxlength={50}
        />
        <Input
          key="input-contacts"
          elementClass="profile-form__contacts"
          id="contacts"
          label="Контакты"
          name="contacts"
          type="textarea"
          maxlength={500}
        />
      </form>
    );
  }
}
