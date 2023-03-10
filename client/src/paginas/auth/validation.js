function validateForm(formData) {
    const errors = {};
    if (!formData.email) {
      errors.email = 'El nombre de usuario es obligatorio';
    } else if (!isValidEmail(formData.email)) {
      errors.email = 'Ingrese un correo electrónico válido';
    } else if (formData.email.length > 35) {
      errors.email = 'El nombre de usuario no debe tener más de 35 caracteres';
    }
  
    if (!formData.password) {
      errors.password = 'La contraseña es obligatoria';
    } else if (!isValidPassword(formData.password)) {
      errors.password = 'La contraseña debe tener al menos un número y tener una longitud mínima de 6 caracteres';
    }
  
    return errors;
  }
  
  function isValidEmail(email) {
    // Validación de correo electrónico utilizando expresión regular
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  function isValidPassword(password) {
    // Validación de contraseña utilizando expresión regular
    const passwordRegex = /^(?=.*\d).{6,}$/    ;
    return passwordRegex.test(password);
  }
  
  export { validateForm };
  