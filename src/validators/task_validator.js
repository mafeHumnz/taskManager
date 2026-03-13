import { body, param } from "express-validator";

export const createTaskValidator = [

  body("titulo")
    .trim()
    .notEmpty()
    .withMessage("El título es obligatorio")
    .isLength({ max: 100 })
    .withMessage("El título no puede superar los 100 caracteres"),

  body("descripcion")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 500 })
    .withMessage("La descripción no puede superar los 500 caracteres"),

  body("dueDate")
    .optional()
    .isISO8601()
    .withMessage("La fecha debe tener formato válido (YYYY-MM-DD)")
    .toDate()
];

export const idTaskValidator = [
  param("id")
    .isMongoId()
    .withMessage("El formato del ID no es válido")
];

export const updateTaskValidator = [

  ...idTaskValidator,

  body("titulo")
    .trim()
    .notEmpty()
    .withMessage("El título no puede estar vacío")
    .isLength({ max: 100 })
    .withMessage("El título no puede superar los 100 caracteres"),

  body("descripcion")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 500 })
    .withMessage("La descripción no puede superar los 500 caracteres"),

  body("estado")
    .optional()
    .isBoolean()
    .withMessage("El estado debe ser true o false")
    .toBoolean(),

  body("dueDate")
    .optional()
    .isISO8601()
    .withMessage("La fecha debe tener formato válido (YYYY-MM-DD)")
    .toDate()
];

