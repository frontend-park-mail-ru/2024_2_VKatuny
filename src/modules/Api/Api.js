import { resolveUrl } from '/src/modules/UrlUtils/UrlUtils.js';

const backendPrefix = 'http://127.0.0.1:8080/api/v1/';
const backendApi = new Map(
  Object.entries({
    authenticated: backendPrefix + 'authorized',
    login: backendPrefix + 'login',
    vacancies: backendPrefix + 'vacancies?',
    logout: backendPrefix + 'logout',
  }),
);

export class Api {
  static isAuthenticated = async () => {
    const authResult = fetch(backendApi.get('authenticated'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      credentials: 'include',
    });
    return authResult.ok;
  };

  static login = async ({ userType, login, password }) => {
    const authResult = await fetch(backendApi.get('login'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify({
        userType: userType,
        login: login,
        password: password,
      }),
      credentials: 'include',
    });
    return authResult;
  };

  registerApplicant = async ({ firstName, lastName, birthDate, email, password }) => {
    const registerResult = await fetch(resolveUrl('register'), {
      method: 'POST',
      headers: {
        Origin: location.origin,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userType: 'applicant',
        firstName: firstName,
        lastName: lastName,
        birthDate: birthDate,
        email: email,
        password: password,
      }),
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
    return fetch(
      backendApi.get('vacancies') +
        new URLSearchParams({
          offset: offset,
          num: num,
        }),
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      },
    )
      .then((response) => {
        return response.json();
      })
      .then((body) => {
        return body.status == '200' && body.vacancies instanceof Array
          ? body.vacancies
          : Promise.reject('failed to unpack data');
      })
      .catch(() => 'failed to receive valid data');
  };

  static logout = async () => {
    return fetch(backendApi.get('logout'), {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
    });
  };
}
