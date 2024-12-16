/** @fileoverview This file contains validators for form fields or form itself */

import { FormValue } from '../models/form_value';

export function validateEmail(email: string): FormValue {
  const matches = email.match(/^(".*"|[^@]*)@[^@]*$/);
  return {
    value: email,
    isValid: Boolean(matches),
    errorMsg: matches ? '' : 'Введен некорректный адрес',
  };
}

export function validatePassword(password: string): FormValue {
  const isValid = password.length >= 8;
  return {
    value: password,
    isValid,
    errorMsg: isValid ? '' : 'Введите пароль длиной хотя бы 8 символов',
  };
}

export function validateOk(value: unknown): FormValue {
  return {
    value,
    isValid: true,
  };
}

export function validateEnglish(value: string): FormValue {
  const isValid = /^[a-zA-Z1-9\- ]+$/.test(value);
  return {
    value,
    isValid,
    errorMsg: isValid ? '' : 'Сюда нужно написать английский текст',
  };
}

export function validateRequired(value: string): FormValue {
  return {
    value,
    isValid: value.trim() !== '',
    errorMsg: 'Заполните это поле',
  };
}

export function validateDateOfBirth(date: string): FormValue {
  try {
    const parsed = Date.parse(date);
    if (isNaN(parsed)) {
      throw new Error('Wrong date format');
    }
    if (parsed > Date.now() - 18 * 365 * 24 * 60 * 60 * 1000) {
      return {
        value: date,
        isValid: false,
        errorMsg: 'Вы слишком молоды, чтобы пользоваться сайтом',
      };
    }
    return {
      value: date,
      isValid: true,
    };
  } catch {
    return {
      value: date,
      isValid: false,
      errorMsg: 'Указана некорректная дата',
    };
  }
}

export function validatorTrain(validators: { (value: string): FormValue }[]) {
  return function (field: string) {
    for (const validator of validators) {
      const formValue = validator(field);
      if (!formValue.isValid) {
        return formValue;
      }
    }
    return {
      value: field,
      isValid: true,
    };
  };
}
