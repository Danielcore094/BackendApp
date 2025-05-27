import { body } from "express-validator";

export const validarCrear = [
  body("nombre").notEmpty().withMessage("El nombre es obligatorio"),
  body("email").isEmail().withMessage("El email no es válido"),
  body("area").notEmpty().withMessage("El área es obligatoria"),
  body("tipoDocumento").notEmpty().withMessage("El tipo de documento es obligatorio"),
  body("numeroDocumento").notEmpty().withMessage("El número de documento es obligatorio"),
  body("fechaIngreso").notEmpty().withMessage("La fecha de ingreso es obligatoria").isISO8601().withMessage("La fecha debe tener formato válido (YYYY-MM-DD)"),
  body("usuario").notEmpty().withMessage("El usuario es obligatorio"),
  body("contrasena").notEmpty().withMessage("La contraseña es obligatoria"),
];

export const validarCliente = [
  body("nombre").notEmpty().withMessage("El nombre es obligatorio"),
  body("correo").isEmail().withMessage("El correo no es válido"),
  body("telefono").notEmpty().withMessage("El teléfono es obligatorio"),
  body("direccion").notEmpty().withMessage("La dirección es obligatoria"),
];