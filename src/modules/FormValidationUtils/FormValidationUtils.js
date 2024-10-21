export const validateEmail = (email) => {
  return String(email).match(/^(".*"|[^@]*)@[^@]*$/);
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

export const EMAIL_MAX_LEN = 50;
export const EMAIL_MIN_LEN = 3;
export const PASSWORD_MIN_LEN = 8;
export const PASSWORD_MAX_LEN = 50;
export const FIRSTNAME_MIN_LEN = 0;
export const FIRSTNAME_MAX_LEN = 50;
export const LASTNAME_MIN_LEN = 0;
export const LASTNAME_MAX_LEN = 50;
export const POSITION_MIN_LEN = 0;
export const POSITION_MAX_LEN = 50;
export const COMPANY_NAME_MIN_LEN = 0;
export const COMPANY_NAME_MAX_LEN = 0;
export const COMPANY_DESCRIPTION_MIN_LEN = 0;
export const COMPANY_DESCRIPTION_MAX_LEN = 500;
export const WEBSITE_MIN_LEN = 0;
export const WEBSITE_MAX_LEN = 100;

export const ERROR_MESSAGES = {
  email: 'Введен некорректный email',
  password: `Пароль должен состоять не менее чем из ${PASSWORD_MIN_LEN} символов, но не более чем из ${PASSWORD_MAX_LEN}`,
  name: 'Имя должно быть на русском языке и занимать не более 50 символов',
  lastname: 'Фамилия должна быть на русском языке и занимать не более 50 символов',
  position: 'Должность не должна превышать 50 символов',
  'company-name': 'Название компании не должно превышать 50 символов',
  'company-description': 'Описание компании не должно превышать 500 символов',
  website: 'Веб-сайт не должен выходить за рамки 100 символов',
  birthdate: 'Дата рождения некорректна',
  notEqualPasswords: 'Введенные пароли не совпадают',
};
