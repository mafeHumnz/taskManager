import { Router } from "express";
import { registerUser, loginUser } from "../controllers/auth_controller";

const router = Router();

router.post("/", registerUser);
router.post("/", loginUser);

export default router;