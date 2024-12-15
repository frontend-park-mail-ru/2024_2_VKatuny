import { Component, VirtualNodeSpec } from '@/modules/vdom/virtual_node';
import * as vdom from '@/modules/vdom/virtual_dom';
import { userStore } from '@/application/stores/user_store/user_store';
import { routerActionCreators } from '@/application/action_creators/router_action_creators';
import { resolveUrl } from '@/modules/common_utils/url_utils/url_utils';
import { UserTypeSelect } from '@/application/components/user_type_select/user_type_select';
import { UserType } from '@/application/models/user-type';
import { Input } from '@/application/components/input/input';
import './registration_page.scss';
import { userActionCreators } from '@/application/action_creators/user_action_creators';

export class RegistrationPage extends Component {
  private userType: UserType = UserType.Applicant;
  private setUserType: (userType: UserType) => void;

  constructor({ url }: { url: URL }) {
    super({ url });
    this.setUserType = (userType: UserType) => {
      this.userType = userType;
      this.domNode.virtualNode.root.update();
    };
  }

  handleFocusOut = (ev: Event) => {
    const target = ev.target as HTMLInputElement;
    const name = target.name;
    const value = target.value;
    userActionCreators.submitRegistrationFields({ [name]: value });
  };

  private handleSubmit = (ev: SubmitEvent) => {
    ev.preventDefault();
    const formData = Object.fromEntries(new FormData(ev.target as HTMLFormElement));
    userActionCreators.register(this.userType, formData);
  };

  render(): VirtualNodeSpec {
    const userData = userStore.getData();
    if (userData.isLoggedIn) {
      routerActionCreators.redirect(new URL(resolveUrl('vacancies', null)));
    }
    const regForm = userData.registrationForm;
    return (
      <main key="registration-page" className="registration-page registration-page_theme-dark">
        <div className="registration-page__header">
          <h2 className="registration-page__header-text">Регистрация</h2>
        </div>
        <UserTypeSelect
          key="user-type-select"
          elementClass="registration-page__user-type-select"
          setUserType={this.setUserType}
        />

        {this.userType === UserType.Applicant ? (
          <form
            className="registration-page__registration-form"
            method="POST"
            novalidate
            onSubmit={this.handleSubmit}
            id="registration-form"
          >
            <Input
              key="input-first-name"
              elementClass="registration-page__first-name"
              id="first-name"
              label="Имя"
              name="firstName"
              type="text"
              placeholder="Иван"
              isRequired={true}
              maxlength={50}
              value={regForm && regForm.firstName && regForm.firstName.value}
              isValid={regForm && regForm.firstName && regForm.firstName.isValid}
              error={regForm && regForm.firstName && regForm.firstName.errorMsg}
              onFocusOut={this.handleFocusOut}
            />
            <Input
              key="input-second-name"
              elementClass="registration-page__second-name"
              id="second-name"
              label="Фамилия"
              name="secondName"
              type="text"
              placeholder="Иванов"
              isRequired={true}
              maxlength={50}
              value={regForm && regForm.secondName && regForm.secondName.value}
              isValid={regForm && regForm.secondName && regForm.secondName.isValid}
              error={regForm && regForm.secondName && regForm.secondName.errorMsg}
              onFocusOut={this.handleFocusOut}
            />
            <Input
              key="input-birthdate"
              elementClass="registration-page__birthdate"
              id="birthdate"
              label="Дата рождения"
              name="birthDate"
              type="date"
              isRequired={true}
              maxlength={50}
              value={regForm && regForm.birthDate && regForm.birthDate.value}
              isValid={regForm && regForm.birthDate && regForm.birthDate.isValid}
              error={regForm && regForm.birthDate && regForm.birthDate.errorMsg}
              onFocusOut={this.handleFocusOut}
            />
            <Input
              key="input-email"
              elementClass="registration-page__email"
              id="email"
              label="Электронная почта"
              name="email"
              type="email"
              placeholder="example@mail.ru"
              isRequired={true}
              maxlength={50}
              value={regForm && regForm.email && regForm.email.value}
              isValid={regForm && regForm.email && regForm.email.isValid}
              error={regForm && regForm.email && regForm.email.errorMsg}
              onFocusOut={this.handleFocusOut}
            />
            <Input
              key="input-password"
              elementClass="registration-page__password"
              id="password"
              label="Пароль"
              name="password"
              type="password"
              isRequired={true}
              maxlength={50}
              value={regForm && regForm.password && regForm.password.value}
              isValid={regForm && regForm.password && regForm.password.isValid}
              error={regForm && regForm.password && regForm.password.errorMsg}
              onFocusOut={this.handleFocusOut}
            />
            <Input
              key="input-password-repeat"
              elementClass="registration-page__password-repeat"
              id="password-repeat"
              label="Повторите пароль"
              name="passwordRepeat"
              type="password"
              isRequired={true}
              maxlength={50}
              value={regForm && regForm.passwordRepeat && regForm.passwordRepeat.value}
              isValid={regForm && regForm.passwordRepeat && regForm.passwordRepeat.isValid}
              error={regForm && regForm.passwordRepeat && regForm.passwordRepeat.errorMsg}
              onFocusOut={this.handleFocusOut}
            />
          </form>
        ) : (
          <form
            className="registration-page__registration-form"
            method="POST"
            novalidate
            onSubmit={this.handleSubmit}
            id="registration-form"
          >
            <Input
              key="input-first-name"
              elementClass="registration-page__first-name"
              id="first-name"
              label="Имя"
              name="firstName"
              type="text"
              placeholder="Иван"
              isRequired={true}
              maxlength={50}
              value={regForm && regForm.firstName && regForm.firstName.value}
              isValid={regForm && regForm.firstName && regForm.firstName.isValid}
              error={regForm && regForm.firstName && regForm.firstName.errorMsg}
              onFocusOut={this.handleFocusOut}
            />
            <Input
              key="input-second-name"
              elementClass="registration-page__second-name"
              id="second-name"
              label="Фамилия"
              name="secondName"
              type="text"
              placeholder="Иванов"
              isRequired={true}
              maxlength={50}
              value={regForm && regForm.secondName && regForm.secondName.value}
              isValid={regForm && regForm.secondName && regForm.secondName.isValid}
              error={regForm && regForm.secondName && regForm.secondName.errorMsg}
              onFocusOut={this.handleFocusOut}
            />
            <Input
              key="input-position"
              elementClass="registration-page__position"
              id="position"
              label="Должность"
              name="position"
              type="text"
              placeholder="Ведущий разработчик"
              isRequired={true}
              maxlength={100}
              value={regForm && regForm.position && regForm.position.value}
              isValid={regForm && regForm.position && regForm.position.isValid}
              error={regForm && regForm.position && regForm.position.errorMsg}
              onFocusOut={this.handleFocusOut}
            />
            <Input
              key="input-company-name"
              elementClass="registration-page__company-name"
              id="company-name"
              label="Название компании"
              name="companyName"
              type="text"
              placeholder="ООО Рога и Копыта"
              isRequired={true}
              maxlength={100}
              value={regForm && regForm.companyName && regForm.companyName.value}
              isValid={regForm && regForm.companyName && regForm.companyName.isValid}
              error={regForm && regForm.companyName && regForm.companyName.errorMsg}
              onFocusOut={this.handleFocusOut}
            />
            <Input
              key="input-company-description"
              elementClass="registration-page__company-description"
              id="company-description"
              label="Описание компании"
              name="companyDescription"
              type="textarea"
              isRequired={false}
              maxlength={500}
              hasResizeVertical={true}
              value={regForm && regForm.companyDescription && regForm.companyDescription.value}
              isValid={regForm && regForm.companyDescription && regForm.companyDescription.isValid}
              error={regForm && regForm.companyDescription && regForm.companyDescription.errorMsg}
              onFocusOut={this.handleFocusOut}
            />
            <Input
              key="input-company-website"
              elementClass="registration-page__website"
              id="website"
              label="Сайт компании"
              name="website"
              type="text"
              isRequired={false}
              maxlength={100}
              placeholder="https://example.com"
              value={regForm && regForm.website && regForm.website.value}
              isValid={regForm && regForm.website && regForm.website.isValid}
              error={regForm && regForm.website && regForm.website.errorMsg}
              onFocusOut={this.handleFocusOut}
            />
            <Input
              key="input-email"
              elementClass="registration-page__email"
              id="email"
              label="Электронная почта"
              name="email"
              type="email"
              placeholder="example@mail.ru"
              isRequired={true}
              maxlength={50}
              value={regForm && regForm.email && regForm.email.value}
              isValid={regForm && regForm.email && regForm.email.isValid}
              error={regForm && regForm.email && regForm.email.errorMsg}
              onFocusOut={this.handleFocusOut}
            />
            <Input
              key="input-password"
              elementClass="registration-page__password"
              id="password"
              label="Пароль"
              name="password"
              type="password"
              isRequired={true}
              maxlength={50}
              value={regForm && regForm.password && regForm.password.value}
              isValid={regForm && regForm.password && regForm.password.isValid}
              error={regForm && regForm.password && regForm.password.errorMsg}
              onFocusOut={this.handleFocusOut}
            />
            <Input
              key="input-password-repeat"
              elementClass="registration-page__password-repeat"
              id="password-repeat"
              label="Повторите пароль"
              name="passwordRepeat"
              type="password"
              isRequired={true}
              maxlength={50}
              value={regForm && regForm.passwordRepeat && regForm.passwordRepeat.value}
              isValid={regForm && regForm.passwordRepeat && regForm.passwordRepeat.isValid}
              error={regForm && regForm.passwordRepeat && regForm.passwordRepeat.errorMsg}
              onFocusOut={this.handleFocusOut}
            />
          </form>
        )}
        <div className="registration-page__button-container">
          <button
            type="submit"
            form="registration-form"
            className="registration-page__submit-button button button_main-primary"
          >
            Зарегистрироваться
          </button>
          <a
            className="registration-page__back-button button button_main-tertiary"
            href={resolveUrl('vacancies', null)}
          >
            На главную
          </a>
        </div>
      </main>
    );
  }
}
