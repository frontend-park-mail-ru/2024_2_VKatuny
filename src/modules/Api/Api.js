import { resolveUrl } from '/src/modules/UrlUtils/UrlUtils.js';

export class Api {
  static login({ userType, email, password }) {
    return fetch(resolveUrl('login'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Указываем, что отправляем JSON
        Origin: location.origin,
      },
      body: JSON.stringify({ // Преобразуем данные в формат JSON
        userType,
        email,
        password,
      }),
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(errorData => {
          throw new Error(errorData.message || 'Login failed'); // Обработка ошибок
        });
      }
      return response.json(); // Возвращаем распарсенный JSON
    });
  }

  static registerApplicant({ firstName, lastName, birthDate, email, password }) {
    return fetch(resolveUrl('register'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Указываем тип контента
        Origin: location.origin,
      },
      body: JSON.stringify({ // Преобразуем данные в JSON
        userType: 'applicant',
        firstName,
        lastName,
        birthDate,
        email,
        password,
      }),
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(errorData => {
          throw new Error(errorData.message || 'Registration failed'); // Обработка ошибок
        });
      }
      return response.json(); // Возвращаем распарсенный ответ
    });
  }

  static registerEmployer({ firstName, lastName, position, companyName, companyDescription, companyWebsite, email, password }) {
    return fetch(resolveUrl('register'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Указываем тип контента
        Origin: location.origin,
      },
      body: JSON.stringify({ // Преобразуем данные в JSON
        userType: 'employer',
        firstName,
        lastName,
        position,
        companyName,
        companyDescription,
        companyWebsite,
        email,
        password,
      }),
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(errorData => {
          throw new Error(errorData.message || 'Registration failed'); // Обработка ошибок
        });
      }
      return response.json(); // Возвращаем распарсенный ответ
    });
  }

  static vacanciesFeed({ offset, num }) {
    return fetch(
      `${resolveUrl('vacancies')}?${new URLSearchParams({ offset, num })}`, {
        method: 'GET',
        headers: {
          Origin: location.origin,
        },
      }
    )
    .then(response => {
      if (!response.ok) {
        return response.json().then(errorData => {
          throw new Error(errorData.message || 'Failed to fetch vacancies'); // Обработка ошибок
        });
      }
      return response.json(); // Возвращаем распарсенный ответ
    });
  }

  static isAuthenticated() {
    return new Promise((resolve) => {
      // Проверяем наличие токена в localStorage
      const token = localStorage.getItem('authToken'); // Здесь предполагается, что токен хранится в localStorage
      if (token) {
        // Если токен существует, разрешаем промис в true
        resolve(true);
      } else {
        // Если токена нет, разрешаем промис в false
        resolve(false);
      }
    });
  }
}
