import { resolveUrl } from '/src/modules/UrlUtils/UrlUtils.js';

const backendPrefix = 'http://127.0.0.1:8080/api/v1'
export class Api {
  static isAuthenticated = async () => {
    const authResult = fetch(backendPrefix + '/authorized', {
      method: 'POST',
      headers: {
        Origin: location.origin,
      }
    });
    return authResult.then((res) => (res.status === 200))
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
