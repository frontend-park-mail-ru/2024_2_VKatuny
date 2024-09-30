const backendPrefix = 'http://127.0.0.1:8080/api/v1/';
const backendApi = new Map(
  Object.entries({
    authenticated: backendPrefix + 'authorized',
    login: backendPrefix + 'login',
    vacancies: backendPrefix + 'vacancies?',
    logout: backendPrefix + 'logout',
    registerApplicant: backendPrefix + 'registration/worker',
    registerEmployer: backendPrefix + 'registration/employer',
  }),
);

export class Api {
  static isAuthenticated = async () => {
    return fetch(backendApi.get('authenticated'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      credentials: 'include',
    }).then((res) => {
      return res.json();
    });
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

  static registerApplicant = async ({ firstName, lastName, birthDate, email, password }) => {
    return fetch(backendApi.get('registerApplicant'), {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify({
        workerName: firstName,
        workerLastName: lastName,
        workerBirthDate: birthDate,
        workerEmail: email,
        workerPassword: password,
      }),
    });
  };

  static registerEmployer = async ({
    firstName,
    lastName,
    position,
    companyName,
    companyDescription,
    companyWebsite,
    email,
    password,
  }) => {
    return fetch(backendApi.get('registerEmployer'), {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify({
        employerName: firstName,
        employerLastName: lastName,
        employerPosition: position,
        companyName,
        companyDescription,
        website: companyWebsite,
        employerEmail: email,
        employerPassword: password,
      }),
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
