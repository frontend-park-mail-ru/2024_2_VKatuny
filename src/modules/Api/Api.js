import USER_TYPE from '../UserSession/UserType.js';

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

  static registerApplicant = async ({ firstName, secondName, birthDate, email, password }) => {
    return fetchCorsJson(backendApi.get('registerApplicant'), {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        name: firstName,
        lastName: secondName,
        birthDate: birthDate,
        email: email,
        password: password,
      }),
    });
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
    return fetchCorsJson(backendApi.get('registerEmployer'), {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        employerName: firstName,
        employerLastName: secondName,
        employerPosition: position,
        companyName,
        companyDescription,
        website: website,
        employerEmail: email,
        employerPassword: password,
      }),
    });
  };

  static getUserById = async ({ id, userType }) => {
    console.log(`getUserById: ${id}`);
    return userType === USER_TYPE.APPLICANT
      ? {
          firstName: 'Илья',
          secondName: 'Андриянов',
          city: 'Москва',
          birthDate: '2001-10-09',
          avatar: 'public/img/notification-icon-36.svg',
          contacts: 'telegram: @AndriyanovIM',
          education: 'Высшее',
          email: 'ilyaandry35@gmail.com',
        }
      : {
          firstName: 'Илья',
          secondName: 'Андриянов',
          city: 'Москва',
          position: 'Инженер программист 2й категории',
          companyName: 'ООО ИЦ КАМАЗ',
          companyDescription: 'Дочернее предприятие ПАО КАМАЗ',
          website: 'www.ickamaz.ru',
          avatar: 'public/img/profile-menu-icon.svg',
          contacts: 'telegram: @AndriyanovIM',
          email: 'ilyaandry35@gmail.com',
        };
  };

  static getApplicantById = async ({ id }) => {
    return this.getUserById({ id, userType: USER_TYPE.APPLICANT });
  };

  static getEmployerById = async ({ id }) => {
    return this.getUserById({ id, userType: USER_TYPE.EMPLOYER });
  };

  static getEmployerVacancies({ id }) {
    console.log(`getEmployerVacancies: userid-${id}`);
    return [
      {
        id: 1,
        employer: 123332,
        salary: 12000,
        position: 'Инженер',
        description: 'Требуются инженеры для работы над проектом',
        workType: 'Единовременная',
        avatar: '',
        createdAt: '2010-10-10',
      },
      {
        id: 2,
        employer: 123332,
        salary: 12000,
        position: 'Инженер-программист',
        description: 'Требуются инженеры для работы над проектом',
        workType: 'Полная',
        avatar: '',
        createdAt: '2001-11-11',
      },
    ];
  }

  static getApplicantPortfolios({ id }) {
    console.log(`getApplicantPortfolios: userid-${id}`);
    return [
      {
        id: 1,
        name: 'Моя коллекция домашних животных',
      },
      {
        id: 2,
        name: 'Работа над проектом строительства здания',
      },
    ];
  }

  static getApplicantCvs({ id }) {
    console.log(`getApplicantPortfolios: userid-${id}`);
    return [
      {
        id: 1,
        applicantId: 1,
        positionRus: 'Инженер',
        positionEng: 'Engineer',
        jobSearchStatus: 0,
        workingExperience: 'нету',
        avatar: '',
        createdAt: '2010-10-10',
      },
      {
        id: 2,
        applicantId: 1,
        positionRus: 'Разработчик',
        positionEng: 'Software engineer',
        jobSearchStatus: 0,
        workingExperience: 'нету',
        avatar: '',
        createdAt: '2010-10-10',
      },
    ];
  }

  static updateApplicantProfile = async ({
    firstName,
    secondName,
    city,
    education,
    birthDate,
    contacts,
  }) => {
    const inputData = { firstName, secondName, city, education, birthDate, contacts };
    console.log(inputData);
    return true;
  };

  static updateEmployerProfile = async ({ firstName, secondName, city, contacts }) => {
    const inputData = { firstName, secondName, city, contacts };
    console.log(inputData);
    return true;
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
