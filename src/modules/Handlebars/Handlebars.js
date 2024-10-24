import { resolveStatic, resolveUrl } from '/src/modules/UrlUtils/UrlUtils.js';

export const handlebarsInit = () => {
  Handlebars.registerHelper('static', resolveStatic);
  Handlebars.registerHelper('url', resolveUrl);

  Handlebars.registerPartial('header', Handlebars.templates['header.hbs']);
  Handlebars.registerPartial('login-form', Handlebars.templates['login-form.hbs']);
  Handlebars.registerPartial('notification', Handlebars.templates['notification.hbs']);
  Handlebars.registerPartial(
    'employer-registration-form',
    Handlebars.templates['employer-registration-form.hbs'],
  );
  Handlebars.registerPartial(
    'applicant-registration-form',
    Handlebars.templates['applicant-registration-form.hbs'],
  );
  Handlebars.registerPartial(
    'user-type-radiogroup',
    Handlebars.templates['user-type-radiogroup.hbs'],
  );
  Handlebars.registerPartial('validated-input', Handlebars.templates['validated-input.hbs']);
  Handlebars.registerPartial('validated-textarea', Handlebars.templates['validated-textarea.hbs']);
};
