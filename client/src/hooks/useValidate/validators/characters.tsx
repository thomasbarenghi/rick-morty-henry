import { characterOptions } from "@/constants";

type validResponse = {
  isValid: boolean;
  error: string;
};

export const isValidImageString = (value: string): validResponse => {
  if (!value || value.trim() === "") {
    return {
      isValid: false,
      error: "La imagen es requerida",
    };
  }
  //regex
  const regexUrl = /([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/i;
  const isValid = regexUrl.test(value);

  if (!isValid) {
    return {
      isValid: false,
      error: "La imagen debe ser una url válida",
    };
  } else {
    return {
      isValid: true,
      error: "",
    };
  }
};

export const isValidSpecie = (value: string): validResponse => {
  console.log("isValidSpecie.value", value);
  if (!value || value.trim() === "") {
    return {
      isValid: false,
      error: "La especie es requerida",
    };
  }

  //Si algun objeto de characterOptions.species[item].value tiene el valor de value, entonces es valido
  const isValid = characterOptions.species.some((item) => item.value === value);
  console.log("isValidSpecie.isValid", isValid);
  if (!isValid) {
    return {
      isValid: false,
      error: "La especie no es válida",
    };
  }

  return {
    isValid: true,
    error: "",
  };
};

export const isValidGender = (value: string): validResponse => {
  if (!value || value.trim() === "") {
    return {
      isValid: false,
      error: "El genero es requerido",
    };
  }

  const isValid = characterOptions.gender.some((item) => item.value === value);

  if (!isValid) {
    return {
      isValid: false,
      error: "El genero no es válido",
    };
  }

  return {
    isValid: true,
    error: "",
  };
};

export const isValidOrigin = (value: string): validResponse => {
  if (!value || value.trim() === "") {
    return {
      isValid: false,
      error: "El origen es requerido",
    };
  }

  const isValid = characterOptions.origin.some((item) => item.value === value);

  if (!isValid) {
    return {
      isValid: false,
      error: "El origen no es válido",
    };
  }

  return {
    isValid: true,
    error: "",
  };
};

export const isValidStatus = (value: string): validResponse => {
  if (!value || value.trim() === "") {
    return {
      isValid: false,
      error: "El estado es requerido",
    };
  }

  const isValid = characterOptions.status.some((item) => item.value === value);

  if (!isValid) {
    return {
      isValid: false,
      error: "El estado no es válido",
    };
  }

  return {
    isValid: true,
    error: "",
  };
};
