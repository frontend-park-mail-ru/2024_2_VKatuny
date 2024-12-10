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
