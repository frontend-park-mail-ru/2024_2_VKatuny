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
};
