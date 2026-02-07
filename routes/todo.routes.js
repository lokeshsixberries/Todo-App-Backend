import { Router } from "express";
import { createTodo, getAllTodos, getTodoById, updateTodo, deleteTodo, getAllTodosByUserId } from "../controller/todo.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.use(authMiddleware);

router.post("/create", createTodo);
router.get("/", getAllTodos);
router.get("/:id", getTodoById);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);
router.get("/:id/user-todos", getAllTodosByUserId);

export default router;  