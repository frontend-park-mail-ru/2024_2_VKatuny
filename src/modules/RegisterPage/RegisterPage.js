import { Page } from '/src/modules/Page/Page.js';

export class RegisterPage extends Page {
  constructor(url) {
    super(url);
  }

  render() {
    return Handlebars.templates['register.hbs']();
  }
}
