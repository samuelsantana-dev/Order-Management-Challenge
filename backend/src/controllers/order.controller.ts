import { OrderService } from "../services/order.service";
import { Request, Response, NextFunction } from "express";

const service = new OrderService();

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await service.createOrder(req.body);
    res.status(201).json({ message: "Pedido criado com sucesso!", order });
  } catch (error) {
    next(error);
  }
};

export const listOrders = async (req: Request, res: Response, next: NextFunction) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const state = (req.query.state as string) || "";

  try {
    const orders = await service.listOrders({ page, limit, state });
    res.status(200).json({ message: "Pedidos listados com sucesso!", orders });
  } catch (error) {
    next(error);
  }
};

export const advanceOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "ID do pedido é obrigatório" });
    }
    const result = await service.advanceOrder(id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await service.deleteOrderService(id);
    res.status(204).json(result);
  } catch (err) {
    next(err);
  }
};
