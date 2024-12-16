/** FormValue holds a value and its validation status */
export interface FormValue {
  value: unknown;
  isValid: boolean;
  errorMsg?: string;
}
