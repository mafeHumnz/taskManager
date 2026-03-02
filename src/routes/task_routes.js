import { Router } from "express";
import { createTask,
        getTask,
        getTasks,
        updateTask,
        deleteTask
        } from "../controllers/task_controller.js";

const router = Router();

router.post("/", createTask);
router.get("/:id", getTask);
router.get("/", getTasks);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);



export default router;