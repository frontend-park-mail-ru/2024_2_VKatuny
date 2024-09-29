import { resolveUrl } from '/src/modules/UrlUtils/UrlUtils.js';

export class Api {
  static isAuthenticated = async () => {
    const authResult = fetch('http://127.0.0.1:8080/api/v1/', {
      method: 'POST',
      headers: {
        'Origin': location.origin,
        'Access-Control-Allow-Origin': 'http://127.0.0.1:8000'
      },
      body: {},
    });
    return authResult
  };

  login = async ({ userType, email, password }) => {
    const authResult = await fetch('http://127.0.0.1:8080/api/v1', {
      method: 'POST',
      headers: {
        Origin: location.origin,
      },
      body: {
        userType: userType,
        email: email,
        password: password,
      },
    });
    console.log(authResult);
  };

  registerApplicant = async ({ firstName, lastName, birthDate, email, password }) => {
    const registerResult = await fetch(resolveUrl('register'), {
      method: 'POST',
      headers: {
        Origin: location.origin,
      },
      body: {
        userType: 'applicant',
        firstName: firstName,
        lastName: lastName,
        birthDate: birthDate,
        email: email,
        password: password,
      },
    });
    console.log(registerResult);
  };

  registerEmployer = async ({
    firstName,
    lastName,
    position,
    companyName,
    companyDescription,
    companyWebsite,
    email,
    password,
  }) => {
    const registerResult = await fetch(resolveUrl('register'), {
      method: 'POST',
      headers: {
        Origin: location.origin,
      },
      body: {
        userType: 'employer',
        firstName: firstName,
        lastName: lastName,
        position: position,
        companyName: companyName,
        companyDescription: companyDescription,
        companyWebsite: companyWebsite,
        email: email,
        password: password,
      },
    });
  };

  static vacanciesFeed = async ({ offset, num }) => {
    const vacancies = fetch(
      resolveUrl('vacancies') +
        '?' +
        new URLSearchParams({
          offset: offset,
          num: num,
        }),
      {
        method: 'GET',
        headers: {
          Origin: location.origin,
        },
      },
    );
  };
}
