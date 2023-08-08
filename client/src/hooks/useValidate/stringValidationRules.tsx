import {
  isValidEmail,
  isValidPassword,
  isValidName,
  isValidImageString,
  isValidSpecie,
  isValidGender,
  isValidOrigin,
  isValidStatus,
} from "./validators";

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
  firstName: (value: string): validResponse => isValidName(value),
  lastName: (value: string): validResponse => isValidName(value),
  name: (value: string): validResponse => isValidName(value),
  image: (value: string): validResponse => isValidImageString(value),
  species: (value: string): validResponse => isValidSpecie(value),
  gender: (value: string): validResponse => isValidGender(value),
  origin_name: (value: string): validResponse => isValidOrigin(value),
  location_name: (value: string): validResponse => isValidOrigin(value),
  status: (value: string): validResponse => isValidStatus(value),
};
