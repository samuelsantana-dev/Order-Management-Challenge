import { OrderRepository } from "../repositories/order.repository";
import { OrderState } from "../config/utils/enum/order";
import { OrderType, OrderListParams } from "../config/utils/types/order";
import { DatabaseError } from "../errors/database.error";
import { messages } from "../config/utils/messages";
export class OrderService {
  private repo = new OrderRepository();

  async createOrder(data: OrderType) {
    const { services } = data;

    if (!services || services.length === 0)
      throw new DatabaseError();

    const total = services.reduce((sum: number, s: any) => sum + s.value, 0);
    if (total === 0)
      throw new DatabaseError(messages.orders.value_must_be_greater_than_zero);

    return this.repo.createOrder(data);
  }

  async listOrders({ page, limit, state }: OrderListParams) {
    const query: any = {};
    if (state) query.state = state;

    return this.repo.listOrders({query, page, limit});
  }

  async advanceOrder(id: string) {
    const order = await this.repo.findById(id);

    if (!order) throw new DatabaseError(messages.orders.order_not_found);

    const flow = [OrderState.CREATED, OrderState.ANALYSIS, OrderState.COMPLETED];
    const currentIndex = flow.indexOf(order.state as OrderState);

    if (currentIndex === flow.length - 1)
      throw new DatabaseError(messages.orders.order_already_completed);

    const currentState = order.state as OrderState;
    const nextState = flow[currentIndex + 1];

    order.state = nextState as OrderState;
    await order.save();

    return {
      message: `Pedido avançaria de ${currentState} para ${nextState}`,
    };
  }

  async deleteOrderService(id?: string){
    if (!id) throw new DatabaseError(messages.orders.order_not_found);
    const order = await this.repo.findById(id);
    if (!order) throw new DatabaseError(messages.orders.order_not_found);
    await this.repo.deleteById(id);
    return { message: `${messages.orders.order_deleted}` };
  }
}
