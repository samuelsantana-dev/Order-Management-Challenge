import { Router } from "express";
import { authRoutes } from "./auth";
import { orderRoutes } from "./order";
import { ErrorMiddleware } from "../middlewares/error";

export const router = Router();
router.use("/auth", authRoutes);
router.use("/orders", orderRoutes);
router.use(ErrorMiddleware);