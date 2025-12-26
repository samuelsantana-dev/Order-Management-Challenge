import { OrderModel } from "../models/order";
import { Order } from "../enums/order";
import { Request, Response } from "express";

export const createOrder = async (req: Request, res: Response) => {
  const { lab, patient, customer, services } = req.body;

  if (!services || services.length === 0)
    return res.status(400).json({ error: "Serviços obrigatórios" });

  const total = services.reduce((sum: number, s: any) => sum + s.value, 0);
  if (total === 0)
    return res.status(400).json({ error: "Valor total não pode ser zero" });

  const order = await OrderModel.create({
    lab,
    patient,
    customer,
    services
  });

  res.json(order);
};

export const listOrders = async (req: Request, res: Response) => {
  const { page = 1, limit = 10, state } = req.query;

  const query: any = {};
  if (state) query.state = state;

  const orders = await OrderModel.find(query)
    .skip((Number(page) - 1) * Number(limit))
    .limit(Number(limit));

  res.json(orders);
};

export const advanceOrder = async (req: Request, res: Response) => {
  const { id } = req.params;

  const order = await OrderModel.findById(id);
  if (!order) return res.status(404).json({ error: "Pedido não encontrado" });

  const flow = [Order.CREATED, Order.ANALYSIS, Order.COMPLETED];
  const currentIndex = flow.indexOf(order.state as Order || undefined);

  if (currentIndex === flow.length - 1){
    return res.status(400).json({ error: "Pedido já está COMPLETED" });
  }

  return res.status(200).json({ message: `Pedido avançaria de ${order.state} para ${flow[currentIndex + 1]}` });

  // if (currentIndex >= 0 && currentIndex < flow.length - 1) {
  //   order.state = flow[currentIndex + 1];
  //   await order.save();
  // }

  // res.json(order);
};
