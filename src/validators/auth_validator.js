import { body, param } from "express-validator";

export const registerUserValidator = [
  body("nombre")
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio"),

  body("email")
    .trim()
    .notEmpty().withMessage("El campo email debe ser obligatorio")
    .isEmail().withMessage("Debe ser un email válido")
    .normalizeEmail(),

  body("apodo")
    .optional({checkFalsy:true})
    .trim(),

  body("password")
    .notEmpty()
    .withMessage("El password es obligatorio")
    .isLength({min:8})
    .withMessage("El password debe tener al menos 8 cararacteres"),
];

export const loginUserValidator = [
  body("email")
    .trim()
    .notEmpty().withMessage("El campo email es obligatorio")
    .isEmail().withMessage("El email debe ser valido")
    .normalizeEmail(),

  body("password")
    .notEmpty().withMessage("El campo password es obligatorio"),
];

// export const idParamValidator = [
//   param("id")
//     .exists().withMessage("El ID es obligatorio")
//     .isMongoId().withMessage("El formato ID no es valido"),
// ];

// export const updateUserValidator = [
//   ...idParamValidator,
//   body("nombre").trim().notEmpty().withMessage("El nombre no puede estar vacío"),
//   body("email").notEmpty().withMessage("Email no puede estar vacio")
//   .isEmail().withMessage("Formato de email no válido"),
// ];