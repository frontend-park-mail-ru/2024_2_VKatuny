import { Component } from './Component.js';

export class LoginForm extends Component {
  constructor() {
    super();
  }

  render({ logo, name, city }, { position, salary, description, createdAt }) {
    return Handlebars.templates['login-form.hbs']({
      employer: { logo: logo, name: name, city: city },
      vacancy: {
        position: position,
        salary: salary,
        description: description,
        createdAt: createdAt,
      },
    });
  }
}
