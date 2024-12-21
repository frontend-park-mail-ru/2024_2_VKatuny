import { Component } from '@/modules/vdom/virtual_node';
import * as vdom from '@/modules/vdom/virtual_dom';
import { Input } from '@/application/components/input/input';
import { UserType } from '@/application/models/user-type';
import { profileStore } from '@/application/stores/profile_store/profile_store';
import { userStore } from '@/application/stores/user_store/user_store';
import { Applicant } from '@/application/models/applicant';
import { profileActionCreators } from '@/application/action_creators/profile_action_creators';
import './profile_form.scss';
import { PictureInput } from '../picture_input/picture_input';

export interface ProfileFormProps {
  elementClass: string;
  userType: UserType;
  onSubmit?: () => void;
  onReset?: () => void;
}

export class ProfileForm extends Component {
  private avatar: string;
  constructor({ elementClass, userType, onSubmit, onReset }: ProfileFormProps) {
    super({ elementClass, userType, onSubmit, onReset });
  }

  private handleFocusOut = (ev: Event) => {
    const target = ev.target as HTMLInputElement;
    const name = target.name;
    const value = target.value;
    profileActionCreators.submitProfileFields({ [name]: value });
  };

  private handleOnChange = (ev: Event) => {
    const imageInput = ev.target as HTMLInputElement;
    const file = imageInput.files && imageInput.files[0];
    if (!file) {
      return;
    }
    profileActionCreators.submitProfileFields({ avatar: file });
  };

  render() {
    const profileForm = profileStore.getData().profileForm;
    const userProfile = userStore.getData().userProfile;
    return this.props.userType === UserType.Applicant ? (
      <form
        className={`${this.props.elementClass} profile-form`}
        id="profile-form"
        method="POST"
        novalidate
        onSubmit={this.props.onSubmit}
        onReset={this.props.onReset}
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
          value={
            (profileForm && profileForm.firstName && profileForm.firstName.value) ||
            userProfile.firstName
          }
          isValid={profileForm && profileForm.firstName && profileForm.firstName.isValid}
          error={profileForm && profileForm.firstName && profileForm.firstName.errorMsg}
          onFocusOut={this.handleFocusOut}
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
          value={
            (profileForm && profileForm.secondName && profileForm.secondName.value) ||
            userProfile.secondName
          }
          isValid={profileForm && profileForm.secondName && profileForm.secondName.isValid}
          error={profileForm && profileForm.secondName && profileForm.secondName.errorMsg}
          onFocusOut={this.handleFocusOut}
        />
        <Input
          key="input-city"
          elementClass="profile-form__city"
          id="city"
          label="Город"
          name="city"
          type="text"
          maxlength={50}
          value={(profileForm && profileForm.city && profileForm.city.value) || userProfile.city}
          isValid={profileForm && profileForm.city && profileForm.city.isValid}
          error={profileForm && profileForm.city && profileForm.city.errorMsg}
          onFocusOut={this.handleFocusOut}
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
          value={
            (profileForm && profileForm.birthDate && profileForm.birthDate.value) ||
            (userProfile as Applicant).birthDate.toISOString().split('T')[0]
          }
          isValid={profileForm && profileForm.birthDate && profileForm.birthDate.isValid}
          error={profileForm && profileForm.birthDate && profileForm.birthDate.errorMsg}
          onFocusOut={this.handleFocusOut}
        />
        <Input
          key="input-education"
          elementClass="profile-form__education"
          id="education"
          label="Образование"
          name="education"
          type="textarea"
          maxlength={500}
          value={
            (profileForm && profileForm.education && profileForm.education.value) ||
            (userProfile as Applicant).education
          }
          isValid={profileForm && profileForm.education && profileForm.education.isValid}
          error={profileForm && profileForm.education && profileForm.education.errorMsg}
          onFocusOut={this.handleFocusOut}
          hasResizeVertical={true}
        />
        <Input
          key="input-contacts"
          elementClass="profile-form__contacts"
          id="contacts"
          label="Контакты"
          name="contacts"
          type="textarea"
          maxlength={500}
          value={
            (profileForm && profileForm.contacts && profileForm.contacts.value) ||
            userProfile.contacts
          }
          isValid={profileForm && profileForm.contacts && profileForm.contacts.isValid}
          error={profileForm && profileForm.contacts && profileForm.contacts.errorMsg}
          onFocusOut={this.handleFocusOut}
          hasResizeVertical={true}
        />
        <PictureInput
          key="input-avatar"
          elementClass="profile-form__avatar"
          id="avatar"
          label="Аватар"
          caption="Нажмите, чтобы выбрать аватар (до 20 Мб)"
          name="avatar"
          onChange={this.handleOnChange}
          value={
            (profileForm &&
              profileForm.avatar &&
              URL.createObjectURL(profileForm.avatar.value as File)) ||
            userProfile.avatar
          }
        />
      </form>
    ) : (
      <form
        className={`${this.props.elementClass} profile-form`}
        id="profile-form"
        method="POST"
        novalidate
        onSubmit={this.props.onSubmit}
        onReset={this.props.onReset}
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
          value={
            (profileForm && profileForm.firstName && profileForm.firstName.value) ||
            userProfile.firstName
          }
          isValid={profileForm && profileForm.firstName && profileForm.firstName.isValid}
          error={profileForm && profileForm.firstName && profileForm.firstName.errorMsg}
          onFocusOut={this.handleFocusOut}
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
          value={
            (profileForm && profileForm.secondName && profileForm.secondName.value) ||
            userProfile.secondName
          }
          isValid={profileForm && profileForm.secondName && profileForm.secondName.isValid}
          error={profileForm && profileForm.secondName && profileForm.secondName.errorMsg}
          onFocusOut={this.handleFocusOut}
        />
        <Input
          key="input-city"
          elementClass="profile-form__city"
          id="city"
          label="Город"
          name="city"
          type="text"
          maxlength={50}
          value={(profileForm && profileForm.city && profileForm.city.value) || userProfile.city}
          isValid={profileForm && profileForm.city && profileForm.city.isValid}
          error={profileForm && profileForm.city && profileForm.city.errorMsg}
          onFocusOut={this.handleFocusOut}
        />
        <Input
          key="input-contacts"
          elementClass="profile-form__contacts"
          id="contacts"
          label="Контакты"
          name="contacts"
          type="textarea"
          maxlength={500}
          value={
            (profileForm && profileForm.contacts && profileForm.contacts.value) ||
            userProfile.contacts
          }
          isValid={profileForm && profileForm.contacts && profileForm.contacts.isValid}
          error={profileForm && profileForm.contacts && profileForm.contacts.errorMsg}
          onFocusOut={this.handleFocusOut}
          hasResizeVertical={true}
        />
        <PictureInput
          key="input-avatar"
          elementClass="profile-form__avatar"
          id="avatar"
          label="Аватар"
          name="avatar"
          caption="Нажмите, чтобы выбрать аватар (до 20 Мб)"
          onChange={this.handleOnChange}
          value={
            (profileForm &&
              profileForm.avatar &&
              URL.createObjectURL(profileForm.avatar.value as File)) ||
            userProfile.avatar
          }
        />
      </form>
    );
  }
}
