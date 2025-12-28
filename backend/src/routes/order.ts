import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import {
  createOrder,
  listOrders,
  advanceOrder,
  deleteOrder
} from "../controllers/order.controller";

export const orderRoutes = Router();

orderRoutes.use(authMiddleware);

orderRoutes.post("/create/", createOrder);
orderRoutes.get("/list/", listOrders);
orderRoutes.patch("/:id/advance", advanceOrder);
orderRoutes.delete("/delete/:id", deleteOrder);
