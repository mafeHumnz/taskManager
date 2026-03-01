import { Router } from "express";
import { createTask,
        getTask,
        getTasks,
        updateTask,
        deleteTask
        } from "../controllers/task_controller";

const router = Router();

router.post("/", createTask);
router.get("/", getTask);
router.get("/", getTasks);
router.put("/", updateTask);
router.delete("/", deleteTask);



export default router;