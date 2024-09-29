import { Page } from '/src/modules/Page/Page.js';

export class LoginPage extends Page {
  constructor(url) {
    super(url);
  }

  render() {
    return Handlebars.templates['login.hbs']();
  }
}
