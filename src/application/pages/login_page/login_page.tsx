import { Component } from '@/modules/vdom/virtual_node';
import * as vdom from '@/modules/vdom/virtual_dom';
import './login-page.scss';

export class LoginPage extends Component {
  render() {
    return (
      <div class="login-page">
        <main className="login-page__login-container login-page__login-container_theme-dark">
          <h2 className="login-page__header">Вход в аккаунт</h2>
        </main>
      </div>
      // login form here
    );
  }
}
