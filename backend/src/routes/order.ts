import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import {
  createOrder,
  listOrders,
  advanceOrder
} from "../controllers/orderController";

export const orderRoutes = Router();

orderRoutes.use(authMiddleware);

orderRoutes.post("/create/", createOrder);
orderRoutes.get("/list/", listOrders);
orderRoutes.patch("/orders/:id/advance", advanceOrder);
