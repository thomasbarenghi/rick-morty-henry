import { isValidEmail, isValidPassword } from "./validators";

type ValidationFunction = (value: string) => validResponse;

type ValidationRules = {
  [key: string]: ValidationFunction;
};

type validResponse = {
  isValid: boolean;
  error: string;
};

export const validationRules: ValidationRules = {
  email: (value: string): validResponse => isValidEmail(value),
  password: (value: string): validResponse => isValidPassword(value),
};
