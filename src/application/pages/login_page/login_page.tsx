import { Component } from '@/modules/vdom/virtual_node';
import * as vdom from '@/modules/vdom/virtual_dom';
import './login-page.scss';
import { Input } from '@/application/components/input/input';
import { UserTypeSelect } from '@/application/components/user_type_select/user_type_select';
import { resolveUrl } from '@/modules/UrlUtils/UrlUtils';
import { userStore } from '@/application/stores/user_store/user_store';
import { userActionCreators } from '@/application/action_creators/user_action_creators';
import { LoginOptions } from '@/modules/api/src/handlers/auth/login';

export class LoginPage extends Component {
  constructor({ url }: { url: URL }) {
    super({ url });
  }

  render() {
    const formData = userStore.getData().loginForm;
    return (
      <main className="login-page login-page_theme-dark">
        <h2 className="login-page__header">Вход в аккаунт</h2>
        <form
          className="login-page__login-form"
          method="POST"
          novalidate
          onSubmit={this.handleSubmit}
        >
          <UserTypeSelect elementClass="login-page__user-type-select" />
          <Input
            elementClass="login-page__email"
            id="email"
            label="Электронная почта"
            name="email"
            type="email"
            placeholder="example@mail.ru"
            isRequired={true}
            maxlength={50}
            value={formData && formData.email.value}
            isValid={formData && formData.email.isValid}
            error={formData && formData.email.errorMsg}
          />
          <Input
            elementClass="login-page__password"
            id="password"
            label="Пароль"
            name="password"
            type="password"
            isRequired={true}
            maxlength={50}
            isValid={formData && formData.password.isValid}
          />
          <div className="login-page__button-container">
            <button type="submit" className="login-page__button button button_main-primary">
              Войти
            </button>
            <a
              class="login-page__go-back-button button button_main-tertiary"
              href={resolveUrl('vacancies', null)}
            >
              На главную
            </a>
          </div>
        </form>
      </main>
    );
  }

  private handleSubmit = (ev: SubmitEvent) => {
    ev.preventDefault();
    const formData = Object.fromEntries(new FormData(ev.target as HTMLFormElement));
    userActionCreators.login({
      userType: (formData.userType as string).trim(),
      email: (formData.email as string).trim(),
      password: formData.password,
    } as LoginOptions);
  };
}
