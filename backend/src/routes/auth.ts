import { Router } from "express";
import { register, login, deleteUser } from "../controllers/auth.controller";

export const authRoutes = Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.delete("/user/:id", deleteUser);
