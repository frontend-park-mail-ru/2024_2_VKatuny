export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};

export const validateEmptyFields = (fields) => {
  return fields.reduce((emptyFields, field) => {
    if (!field[1]) {
      emptyFields.push(field[0]);
    }
    return emptyFields;
  }, []);
};

export const validatePassword = (password) => {
  return password.length >= 8 && password.length < 50;
};

export const validateUserType = (usertype) => {
  return Boolean(['applicant', 'employer'].find((val) => val === usertype));
};

export const ERROR_MESSAGES = {
  email: 'Введен некорректный email',
  password: 'Пароль должен состоять не менее чем из 8 символов, но не более чем из 50',
  name: 'Имя должно быть на русском языке и занимать не более 50 символов',
  lastname: 'Фамилия должна быть на русском языке и занимать не более 50 символов',
  position: 'Должность не должна превышать 50 символов',
  'company-name': 'Название компании не должно превышать 50 символов',
  'company-description': 'Описание компании не должно превышать 500 символов',
  website: 'Веб-сайт не должен выходить за рамки 100 символов',
  birthdate: 'Дата рождения некорректна',
  notEqualPasswords: 'Введенные пароли не совпадают',
};

export const makeValidateLen = (minlen, maxlen) => {
  return (str) => {
    return str.length >= minlen && str.length <= maxlen;
  };
};

export const validateDate = (date) => {
  try {
    const parsed = new Date(date);
    return !isNaN(parsed);
  } catch {
    return false;
  }
};

export const validateOk = () => true;
