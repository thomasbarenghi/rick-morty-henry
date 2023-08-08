export function validateForm(form, fieldsToValidate) {
  const errors = {};

  if (fieldsToValidate === "*") {
    fieldsToValidate = Object.keys(form);
  }

  fieldsToValidate.forEach((fieldName) => {
    switch (fieldName) {
      case "name":
        if (!form.name) {
          errors.name = "El nombre de usuario es obligatorio";
        } else if (form.name.length > 40) {
          errors.name =
            "El nombre de usuario no debe tener más de 40 caracteres";
        }
        break;
      case "description":
        if (!form.description) {
          errors.description = "La descripción es obligatoria";
        } else if (form.description.length > 1000) {
          errors.description =
            "La descripción no debe tener más de 1000 caracteres";
        }
        break;
      case "released":
        const regexFecha = /^\d{4}-\d{2}-\d{2}$/;
        if (!form.released) {
          errors.released = "La fecha de lanzamiento es obligatoria";
        } else if (form.released > new Date().toISOString().split("T")[0]) {
          errors.released =
            "La fecha de lanzamiento no puede ser mayor a la fecha actual";
        } else if (!regexFecha.test(form.released)) {
          errors.released =
            "La fecha de lanzamiento debe tener el formato YYYY-MM-DD";
        }
        break;
      case "rating":
        if (!form.rating) {
          errors.rating = "El rating es obligatorio";
        } else if (form.rating < 1 || form.rating > 5) {
          errors.rating = "El rating debe estar entre 1 y 5";
        } else if (isNaN(form.rating)) {
          errors.rating = "El rating debe ser un número";
        }
        break;
      case "platforms":
        if (!form.platforms) {
          errors.platforms = "Las plataformas son obligatorias";
        } else if (form.platforms.length > 5) {
          errors.platforms = "No puede seleccionar más de 5 plataformas";
        } else if (form.platforms.length < 1) {
          errors.platforms = "Debe seleccionar al menos 1 plataforma";
        }
        break;
      case "genres":
        if (!form.genres) {
          errors.genres = "Los géneros son obligatorios";
        } else if (form.genres.length > 5) {
          errors.genres = "No puede seleccionar más de 5 géneros";
        } else if (form.genres.length < 1) {
          errors.genres = "Debe seleccionar al menos 1 género";
        }

        break;
      case "background_image":
        const regexUrlImagen = /^https?:\/\/.+\/(.+)\.(jpg|jpeg|png)$/i;
        if (!form.background_image) {
          errors.background_image = "El link de la imagen es obligatorio";
        } else if (!regexUrlImagen.test(form.background_image)) {
          errors.background_image =
            "El link de la imagen debe ser una url válida tipo https";
        }
        break;
      case "token":
        if (!form.token) {
          errors.token = "El token es obligatorio";
        }
        break;
      default:
        break;
    }
  });

  return errors;
}
