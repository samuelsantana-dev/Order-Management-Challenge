import { OrderService } from "../services/order.service";
import { Request, Response } from "express";

const service = new OrderService();

export const createOrder = async (req: Request, res: Response) => {
  try {
    const order = await service.createOrder(req.body);
    res.json({ message: "Pedido criado com sucesso!", order });
  } catch (error) {
    res.status(500).json({ error: "Erro no servidor" });
  }
};

export const listOrders = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const state = req.query.state as string || "";

  try {
    const orders = await service.listOrders({page, limit, state});
    res.json({ message: "Pedidos listados com sucesso!", orders });
  } catch (error) {
    res.status(500).json({ error: "Erro no servidor" });
  }

};

export const advanceOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if(!id) {
      return res.status(400).json({ error: "ID do pedido é obrigatório" });
    }
    const result = await service.advanceOrder(id);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await service.deleteOrderService(id);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
