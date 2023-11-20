import {
  descriptionRegex,
  emailRegex,
  firstNameRegex,
  lastNameRegex,
  passwordRegex,
  titleRegex,
  websiteRegex
} from './regex.const'

interface Pattern {
  value: RegExp
  message: string
}

export const firstNamePattern: Pattern = {
  value: firstNameRegex,
  message: 'Debe tener al menos 2 caracteres, y solo puede contener letras y números'
}

export const lastNamePattern: Pattern = {
  value: lastNameRegex,
  message: 'Debe tener al menos 2 caracteres, y solo puede contener letras y números'
}

export const emailPattern: Pattern = {
  value: emailRegex,
  message: 'Ingresa un email válido'
}

export const passwordPattern: Pattern = {
  value: passwordRegex,
  message: 'La contraseña debe tener al menos 8 caracteres, mayúsculas, minúsculas y números'
}

export const websitePattern: Pattern = {
  value: websiteRegex,
  message: 'Debe ser una URL válida'
}

export const titlePattern: Pattern = {
  value: titleRegex,
  message: 'Debe tener al menos 2 caracteres, y solo puede contener letras y números'
}

export const descriptionPattern: Pattern = {
  value: descriptionRegex,
  message: 'Debe tener al menos 2 caracteres, y solo puede contener letras y números'
}
