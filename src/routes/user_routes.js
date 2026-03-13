import { Router } from "express";
import { registerUser, loginUser } from "../controllers/auth_controller.js";
import validateMiddleware from "../middlewares/validate_middleware.js";
import { registerUserValidator,
    loginUserValidator
 } from "../validators/auth_validator.js";

const router = Router();

router.post("/register", registerUserValidator, validateMiddleware, registerUser);
router.post("/login", loginUserValidator, validateMiddleware, loginUser);

export default router;