import { OrderRepository } from "../repositories/order.repository";
import { OrderState } from "../config/utils/enum/order";

export class OrderService {
  private repo = new OrderRepository();

  async createOrder(data: any) {
    const { services } = data;

    if (!services || services.length === 0)
      throw new Error("Serviços obrigatórios");

    const total = services.reduce((sum: number, s: any) => sum + s.value, 0);
    if (total === 0)
      throw new Error("Valor total não pode ser zero");

    return this.repo.createOrder(data);
  }
  
  async listOrders(page: number, limit: number, state?: string) {
    const query: any = {};
    if (state) query.state = state;

    return this.repo.listOrders(query, page, limit);
  }

  async advanceOrder(id: string) {
    const order = await this.repo.findById(id);

    if (!order) throw new Error("Pedido não encontrado");

    const flow = [OrderState.CREATED, OrderState.ANALYSIS, OrderState.COMPLETED];
    const currentIndex = flow.indexOf(order.state as OrderState);

    if (currentIndex === flow.length - 1)
      throw new Error("Pedido já está COMPLETED");

    const nextState = flow[currentIndex + 1];

    // Aqui você decide se quer apenas retornar OU salvar
    // order.state = nextState;
    // await order.save();

    return {
      message: `Pedido avançaria de ${order.state} para ${nextState}`,
    };
  }
}
