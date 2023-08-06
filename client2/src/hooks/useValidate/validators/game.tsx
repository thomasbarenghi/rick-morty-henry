type validResponse = {
  isValid: boolean;
  error: string;
};

export const isValidName = (value: string): validResponse => {
  //const isValid = /^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(value);
  //Permitimos numeros
  const isValid = /^[a-zA-ZÀ-ÿ0-9\s]{1,40}$/.test(value);
  if (!isValid) {
    return {
      isValid: false,
      error:
        "El nombre no puede contener caracteres especiales y debe tener entre 1 y 40 caracteres",
    };
  } else {
    return {
      isValid: true,
      error: "",
    };
  }
};

export const isDescriptionValid = (value: string): validResponse => {
  if (!value || value.trim() === "") {
    return {
      isValid: false,
      error: "Description is required",
    };
  }
  //regex
  const isValid = value.length <= 60;

  if (!isValid) {
    return {
      isValid: false,
      error: "La descripción no puede superar los 60 caracteres",
    };
  } else {
    return {
      isValid: true,
      error: "",
    };
  }
};

export const isAccessCodeValid = (value: string): validResponse => {
  if (!value || value.trim() === "" || value !== "1234") {
    return {
      isValid: false,
      error: "El código de acceso es invalido",
    };
  }
  //regex
  const isValid = value.length <= 10 && value.length >= 4;

  if (!isValid) {
    return {
      isValid: false,
      error: "El código de acceso debe tener entre 4 y 10 caracteres",
    };
  } else {
    return {
      isValid: true,
      error: "",
    };
  }
};

export const isValidRating = (value: string): validResponse => {
  //ring va del 1 al 5
  if (!value || value.trim() === "") {
    return {
      isValid: false,
      error: "El rating es requerido",
    };
  }

  console.log("date", value);
  //si esta entre 1 y 5
  const isValid = parseFloat(value) >= 1 && parseFloat(value) <= 5.0;
  if (!isValid) {
    return {
      isValid: false,
      error: "El rating debe ser un número entre 1 y 5",
    };
  } else {
    return {
      isValid: true,
      error: "",
    };
  }
};

export const isValidReleased = (value: string): validResponse => {
  if (!value || value.trim() === "") {
    return {
      isValid: false,
      error: "La fecha de lanzamiento es requerida",
    };
  }
  //value llega como aaaa-mm-dd
  //regex

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  const isValid = dateRegex.test(value);

  if (!isValid) {
    return {
      isValid: false,
      error: "La fecha de lanzamiento debe tener el formato dd/mm/aaaa",
    };
  } else {
    return {
      isValid: true,
      error: "",
    };
  }
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
