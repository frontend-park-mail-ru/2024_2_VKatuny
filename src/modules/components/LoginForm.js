import { Component } from './Component.js';
import { LoginForm } from '/src/modules/components/LoginForm.js';

export class LoginForm extends Component {
  constructor({ elementClass, userType }) {
    super({
      elementClass: elementClass,
      userType: userType
    });
  }

  renderStatic() {
    return Handlebars.templates['login-form.hbs']({
      elementClass: this.elementClass,
      userType: this.userType,
    });
  }
}
