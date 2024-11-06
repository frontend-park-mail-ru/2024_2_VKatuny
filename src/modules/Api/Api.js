const backendPrefix = 'http://192.168.88.82:8080/api/v1/';
const backendApi = new Map(
  Object.entries({
    authenticated: backendPrefix + 'authorized',
    login: backendPrefix + 'login',
    vacancies: backendPrefix + 'vacancies?',
    logout: backendPrefix + 'logout',
    registerApplicant: backendPrefix + 'registration/applicant',
    registerEmployer: backendPrefix + 'registration/employer',
    employerProfile: backendPrefix + 'employer/profile/',
    applicantProfile: backendPrefix + 'applicant/profile/',
    applicantPortfolio: backendPrefix + 'applicant/portfolio/',
    applicantCv: backendPrefix + 'applicant/cv/',
    employerVacancies: backendPrefix + 'employer/vacancies/',
  }),
);

export class UnmarshallError extends Error {}
export class ResponseError extends Error {}

export const HTTP_STATUSCODE = {
  OK: 200,
  BAD_REQUEST: 400,
  INTERNAL_SERVER_ERROR: 500,
};

const unpackStandardApiCall = async (response) => {
  let responseBody = undefined;
  try {
    responseBody = await response.json();
  } catch {
    throw new UnmarshallError('Could not unmarshall json');
  }
  if (!responseBody.statusCode) {
    throw new UnmarshallError('Expected statusCode in json, but not found');
  }
  if (responseBody.statusCode !== HTTP_STATUSCODE.OK) {
    if (!responseBody.error) {
      throw new UnmarshallError('Expected error in json, but not found');
    }
    throw new ResponseError(responseBody.error);
  }
  if (!responseBody.body) {
    throw new UnmarshallError('Expected body in json, but not found');
  }
  return responseBody.body;
};

const fetchCorsJson = (url, { method = 'GET', credentials = 'same-origin', body = undefined }) => {
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
    const response = await fetchCorsJson(backendApi.get('authenticated'), {
      method: 'POST',
      credentials: 'include',
    });
    return unpackStandardApiCall(response);
  };

  static login = async ({ userType, email, password }) => {
    const response = await fetchCorsJson(backendApi.get('login'), {
      method: 'POST',
      body: JSON.stringify({
        userType,
        email,
        password,
      }),
      credentials: 'include',
    });
    return unpackStandardApiCall(response);
  };

  static registerApplicant = async ({ firstName, secondName, birthDate, email, password }) => {
    const response = await fetchCorsJson(backendApi.get('registerApplicant'), {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        firstName,
        lastName: secondName,
        birthDate: birthDate,
        email: email,
        password: password,
      }),
    });
    return unpackStandardApiCall(response);
  };

  static registerEmployer = async ({
    firstName,
    secondName,
    position,
    companyName,
    companyDescription,
    website,
    email,
    password,
  }) => {
    const response = await fetchCorsJson(backendApi.get('registerEmployer'), {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        firstName: firstName,
        lastName: secondName,
        position: position,
        companyName,
        companyDescription,
        companyWebsite: website,
        email: email,
        password: password,
      }),
    });
    return unpackStandardApiCall(response);
  };

  static getApplicantById = async ({ id }) => {
    const response = await fetchCorsJson(backendApi.get('applicantProfile') + id, {
      method: 'GET',
    });
    return await unpackStandardApiCall(response);
  };

  static getEmployerById = async ({ id }) => {
    const response = await fetchCorsJson(backendApi.get('employerProfile') + id, {
      method: 'GET',
    });
    return unpackStandardApiCall(response);
  };

  static async getEmployerVacancies({ id }) {
    const response = await fetchCorsJson(backendApi.get('employerVacancies') + id, {
      method: 'GET',
    });
    return unpackStandardApiCall(response);
  }

  static async getApplicantPortfolios({ id }) {
    const response = await fetchCorsJson(backendApi.get('applicantPortfolio') + id, {
      method: 'GET',
    });
    return unpackStandardApiCall(response);
  }

  static async getApplicantCvs({ id }) {
    const response = await fetchCorsJson(backendApi.get('applicantCv') + id, {
      method: 'GET',
    });
    return unpackStandardApiCall(response);
  }

  static updateApplicantProfile = async ({
    id,
    firstName,
    secondName,
    city,
    education,
    birthDate,
    contacts,
  }) => {
    const inputData = {
      firstName,
      lastName: secondName,
      city,
      education,
      birthDate: birthDate.toISOString(),
      contacts,
    };
    const response = await fetchCorsJson(backendApi.get('applicantProfile') + id, {
      credentials: 'include',
      method: 'PUT',
      body: JSON.stringify(inputData),
    });
    return response.ok;
  };

  static updateEmployerProfile = async ({ id, firstName, secondName, city, contacts }) => {
    const inputData = { firstName, lastName: secondName, city, contacts };
    const response = await fetchCorsJson(backendApi.get('employerProfile') + id, {
      credentials: 'include',
      method: 'PUT',
      body: JSON.stringify(inputData),
    });
    return response.ok;
  };

  static getVacancyById = async ({ id }) => {
    console.log(`getVacancyById: ${id}`);
    return {
      id: 3,
      employer: 2,
      salary: 10000,
      companyName: 'ООО Рога и Копыта',
      position: 'Инженер',
      location: 'Москва',
      description: 'Небольшой коллектив ищет близкого по духу инженера для работы',
      workType: 'Разовая',
      avatar: '',
      createdAt: '2024-10-10',
      updatedAt: '2024-10-10',
    };
  };

  static getAppliersByVacancyId = async ({ id }) => {
    console.log(`GetAppliersByVacancyId: ${id}`);
    return [
      {
        id: 2,
        firstName: 'Илья',
        lastName: 'Андриянов',
      },
      {
        id: 1,
        firstName: 'Иван',
        lastName: 'Иванов',
      },
    ];
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
    const response = await fetchCorsJson(backendApi.get('logout'), {
      method: 'POST',
      credentials: 'include',
      body: {},
    });
    return unpackStandardApiCall(response);
  };
}
