import express from "express";
import authRoutes from "./routes/auth.routes.js";
import todoRoutes from "./routes/todo.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/todo", todoRoutes);
app.use("/api/v1/user", userRoutes);

export { app };
