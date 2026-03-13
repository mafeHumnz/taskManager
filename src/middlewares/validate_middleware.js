import { validationResult } from "express-validator";

const validateMiddleware = (req, res, next) => {
  console.log("Cuerpo recibido:", req.body);
  const errors = validationResult(req);
  console.log("Errores encontrados:", errors.array());

  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.array(),
    });
  }

  next();
};

export default validateMiddleware;
