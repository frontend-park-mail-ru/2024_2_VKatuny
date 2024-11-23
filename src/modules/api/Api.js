import backendConfig from '@/config/backend.json';

const backendApi = new Map(
  Object.entries(backendConfig.backendApi).map(([key, value]) => [
    key,
    backendConfig.backendPrefix + value,
  ]),
);

export class UnmarshallError extends Error {}
export class ResponseError extends Error {}
export class TransportError extends Error {}

export const HTTP_METHOD = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete',
};

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
  if (!responseBody.body && responseBody.body !== null) {
    throw new UnmarshallError('Expected body in json, but not found');
  }
  return responseBody.body;
};

const fetchCorsJson = (
  url,
  { method = HTTP_METHOD.GET, credentials = 'same-origin', body = undefined },
) => {
  return fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    mode: 'cors',
    credentials,
    body,
  }).catch((response) => {
    return Promise.reject(new TransportError(response.statusCode));
  });
};
export class Api {
  static isAuthenticated = async () => {
    const response = await fetchCorsJson(backendApi.get('authenticated'), {
      method: HTTP_METHOD.POST,
      credentials: 'include',
    });
    return unpackStandardApiCall(response);
  };

  static login = async ({ userType, email, password }) => {
    const response = await fetchCorsJson(backendApi.get('login'), {
      method: HTTP_METHOD.POST,
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
      method: HTTP_METHOD.POST,
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
      method: HTTP_METHOD.POST,
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
      method: HTTP_METHOD.GET,
    });
    return await unpackStandardApiCall(response);
  };

  static getEmployerById = async ({ id }) => {
    const response = await fetchCorsJson(backendApi.get('employerProfile') + id, {
      method: HTTP_METHOD.GET,
    });
    return unpackStandardApiCall(response);
  };

  static async getEmployerVacancies({ id }) {
    const response = await fetchCorsJson(backendApi.get('employerVacancies') + id, {
      method: HTTP_METHOD.GET,
    });
    return unpackStandardApiCall(response);
  }

  static async getApplicantPortfolios({ id }) {
    const response = await fetchCorsJson(backendApi.get('applicantPortfolio') + id, {
      method: HTTP_METHOD.GET,
    });
    return unpackStandardApiCall(response);
  }

  static async getApplicantCvs({ id }) {
    const response = await fetchCorsJson(backendApi.get('applicantCv') + id, {
      method: HTTP_METHOD.GET,
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
      method: HTTP_METHOD.PUT,
      body: JSON.stringify(inputData),
    });
    return response.ok;
  };

  static updateEmployerProfile = async ({ id, firstName, secondName, city, contacts }) => {
    const inputData = { firstName, lastName: secondName, city, contacts };
    const response = await fetchCorsJson(backendApi.get('employerProfile') + id, {
      credentials: 'include',
      method: HTTP_METHOD.PUT,
      body: JSON.stringify(inputData),
    });
    return response.ok;
  };

  static getVacancyById = async ({ id }) => {
    const response = await fetchCorsJson(backendApi.get('vacancy') + id, {
      method: HTTP_METHOD.GET,
    });
    return unpackStandardApiCall(response);
  };

  static deleteVacancyById = async ({ id }) => {
    const response = await fetchCorsJson(backendApi.get('vacancy') + id, {
      method: HTTP_METHOD.DELETE,
      credentials: 'include',
    });
    return unpackStandardApiCall(response);
  };

  static createVacancy = async ({ salary, position, location, description, workType }) => {
    const response = await fetchCorsJson(backendApi.get('vacancy'), {
      method: HTTP_METHOD.POST,
      body: JSON.stringify({
        salary,
        position,
        location,
        description,
        workType,
      }),
      credentials: 'include',
    });
    return unpackStandardApiCall(response);
  };

  static updateVacancyById = async ({ id, salary, position, location, description, workType }) => {
    const response = await fetchCorsJson(backendApi.get('vacancy') + id, {
      method: HTTP_METHOD.PUT,
      body: JSON.stringify({
        salary,
        position,
        location,
        description,
        workType,
      }),
      credentials: 'include',
    });
    return unpackStandardApiCall(response);
  };

  static getAppliersByVacancyId = async ({ id }) => {
    const response = await fetchCorsJson(backendApi.get('vacancySubscribers') + id, {
      method: HTTP_METHOD.GET,
      credentials: 'include',
    });
    return unpackStandardApiCall(response);
  };

  static vacanciesFeed = async ({ offset, num, searchQuery = '' }) => {
    const response = await fetchCorsJson(
      backendApi.get('vacancies') +
        (searchQuery
          ? new URLSearchParams({
              offset,
              num,
              positionDescription: searchQuery,
            })
          : new URLSearchParams({
              offset,
              num,
            })),
      {
        method: HTTP_METHOD.GET,
      },
    );
    return unpackStandardApiCall(response);
  };

  static getCvById = async ({ id }) => {
    const response = await fetchCorsJson(backendApi.get('cv') + id, {
      method: HTTP_METHOD.GET,
    });
    return unpackStandardApiCall(response);
  };

  static deleteCvById = async ({ id }) => {
    const response = await fetchCorsJson(backendApi.get('cv') + id, {
      method: HTTP_METHOD.DELETE,
      credentials: 'include',
    });
    return unpackStandardApiCall(response);
  };

  static createCv = async ({
    positionRu,
    positionEn,
    workingExperience,
    jobSearchStatus,
    description,
  }) => {
    const response = await fetchCorsJson(backendApi.get('cv'), {
      method: HTTP_METHOD.POST,
      body: JSON.stringify({
        positionRu,
        positionEn,
        workingExperience,
        jobSearchStatus,
        description,
      }),
      credentials: 'include',
    });
    return unpackStandardApiCall(response);
  };

  static updateCvById = async ({
    id,
    positionRu,
    positionEn,
    workingExperience,
    jobSearchStatus,
    description,
  }) => {
    const response = await fetchCorsJson(backendApi.get('cv') + id, {
      method: HTTP_METHOD.PUT,
      body: JSON.stringify({
        positionRu,
        positionEn,
        workingExperience,
        jobSearchStatus,
        description,
      }),
      credentials: 'include',
    });
    return unpackStandardApiCall(response);
  };

  static logout = async () => {
    const response = await fetchCorsJson(backendApi.get('logout'), {
      method: 'POST',
      credentials: 'include',
      body: {},
    });
    return unpackStandardApiCall(response);
  };

  static getVacancyApplyStatusById = async ({ id }) => {
    const response = await fetchCorsJson(backendApi.get('vacancyApply') + id, {
      method: HTTP_METHOD.GET,
      credentials: 'include',
    });
    return unpackStandardApiCall(response);
  };

  static vacancyApply = async ({ id }) => {
    const response = await fetchCorsJson(backendApi.get('vacancyApply') + id, {
      method: HTTP_METHOD.POST,
      body: {},
      credentials: 'include',
    });
    return unpackStandardApiCall(response);
  };

  static vacancyResetApply = async ({ id }) => {
    const response = await fetchCorsJson(backendApi.get('vacancyApply') + id, {
      method: HTTP_METHOD.DELETE,
      body: {},
      credentials: 'include',
    });
    return unpackStandardApiCall(response);
  };

  static getSurveyForm = async ({ type }) => {
    console.log(`getForm: ${type}`);
    return [
      {
        id: 1,
        questionText: 'Насколько вам удобно работать с сервисом?',
      },
      {
        id: 2,
        questionText: 'Насколько вам удобно пользоваться поиском?',
      },
    ];
  };

  static submitSurveyForm = async (form) => {
    console.log(form);
  };

  static getSurveyStats = async () => {
    return [
      { id: 1, questionText: 'Насколько вам удобно работать с сервисом?', avgRating: 4.56 },
      { id: 2, questionText: 'Насколько вам удобно видеть буквы?', avgRating: 1.23 },
    ];
  };
}
