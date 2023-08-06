import {
  isValidName,
  isDescriptionValid,
  isAccessCodeValid,
  isValidRating,
  isValidReleased,
  isValidImageString,
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
  name: (value: string): validResponse => isValidName(value),
  description: (value: string): validResponse => isDescriptionValid(value),
  rating: (value: string): validResponse => isValidRating(value),
  released: (value: string): validResponse => isValidReleased(value),
  background_image: (value: string): validResponse => isValidImageString(value),
  token: (value: string): validResponse => isAccessCodeValid(value),
};
