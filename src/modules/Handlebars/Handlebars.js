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
  Handlebars.registerPartial('profile-minicard', Handlebars.templates['profile-minicard.hbs']);
  Handlebars.registerPartial('frame-series', Handlebars.templates['frame-series.hbs']);
  Handlebars.registerPartial(
    'applicant-profile-form',
    Handlebars.templates['applicant-profile-form.hbs'],
  );
  Handlebars.registerPartial(
    'employer-profile-form',
    Handlebars.templates['employer-profile-form.hbs'],
  );
  Handlebars.registerPartial('vacancy-article', Handlebars.templates['vacancy-article.hbs']);
  Handlebars.registerPartial('vacancy-form', Handlebars.templates['vacancy-form.hbs']);
};
