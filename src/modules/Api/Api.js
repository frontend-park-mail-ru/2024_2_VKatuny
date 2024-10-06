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

const fetchCorsJson = (url, { method = 'GET', credentials = 'same-origin', body = {} }) => {
  return fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    mode: 'cors',
    credentials,
    body,
  });
};
export class Api {
  static isAuthenticated = async () => {
    return fetchCorsJson(backendApi.get('authenticated'), {
      method: 'POST',
      credentials: 'include',
    }).then((res) => {
      return res.json();
    });
  };

  static login = ({ userType, login, password }) => {
    return fetchCorsJson(backendApi.get('login'), {
      method: 'POST',
      body: JSON.stringify({
        userType,
        login,
        password,
      }),
      credentials: 'include',
    });
  };

  static registerApplicant = async ({ firstName, lastName, birthDate, email, password }) => {
    return fetchCorsJson(backendApi.get('registerApplicant'), {
      method: 'POST',
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
    return fetchCorsJson(backendApi.get('registerEmployer'), {
      method: 'POST',
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
    return fetchCorsJson(
      backendApi.get('vacancies') +
        new URLSearchParams({
          offset: offset,
          num: num,
        }),
      {
        method: 'GET',
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
    return fetchCorsJson(backendApi.get('logout'), {
      method: 'POST',
      credentials: 'include',
    });
  };
}
