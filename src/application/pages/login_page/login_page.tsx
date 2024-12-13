import { Component, VirtualNodeSpec } from '@/modules/vdom/virtual_node';
import * as vdom from '@/modules/vdom/virtual_dom';
import './login-page.scss';
import { Input } from '@/application/components/input/input';
import { UserTypeSelect } from '@/application/components/user_type_select/user_type_select';
import { resolveUrl } from '@/modules/common_utils/url_utils/url_utils';
import { userStore } from '@/application/stores/user_store/user_store';
import { userActionCreators } from '@/application/action_creators/user_action_creators';
import { LoginOptions } from '@/modules/api/src/handlers/auth/login';
import { routerActionCreators } from '@/application/action_creators/router_action_creators';

export class LoginPage extends Component {
  constructor({ url }: { url: URL }) {
    super({ url });
  }

  render(): VirtualNodeSpec {
    const userData = userStore.getData();
    const formData = userData.loginForm;
    if (userData.isLoggedIn) {
      routerActionCreators.redirect(new URL(resolveUrl('vacancies', null)));
    }
    return (
      <main className="login-page login-page_theme-dark">
        <h2 className="login-page__header">Вход в аккаунт</h2>
        <form
          className="login-page__login-form"
          method="POST"
          novalidate
          onSubmit={this.handleSubmit}
        >
          <UserTypeSelect key="user-type-select" elementClass="login-page__user-type-select" />
          <Input
            key="input-email"
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
            key="input-password"
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
