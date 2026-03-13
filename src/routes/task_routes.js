import { Router } from "express";

import { createTask,
        getTask,
        getTasks,
        updateTask,
        deleteTask
        } from "../controllers/task_controller.js";
import { authMiddleware } from "../middlewares/auth.js";

import { createTaskValidator,
        updateTaskValidator,
        idTaskValidator
 } from "../validators/task_validator.js";

import validateMiddleware from "../middlewares/validate_middleware.js";

const router = Router();

router.post("/", authMiddleware, createTaskValidator, validateMiddleware, createTask);
router.get("/:id", authMiddleware, idTaskValidator, validateMiddleware, getTask);
router.get("/", authMiddleware, getTasks);
router.put("/:id", authMiddleware, updateTaskValidator, validateMiddleware, updateTask);
router.delete("/:id", authMiddleware, idTaskValidator, validateMiddleware, deleteTask);



export default router;