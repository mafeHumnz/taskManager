import "dotenv/config";
import express from "express";
import userRouter from "./routes/user_routes.js";
import taskRouter from "./routes/task_routes.js" 

const app = express();

app.use(express.json());

app.use("/user", userRouter);
app.use("/tasks", taskRouter);

export default app;