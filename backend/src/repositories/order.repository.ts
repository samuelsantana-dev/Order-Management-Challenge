import { OrderListParams, OrderType } from '../config/utils/types/order';
import { OrderModel } from './../config/models/order';

export class OrderRepository {
    async createOrder(data: OrderType) {
        return OrderModel.create(data);
    }

    async findById(id: string){
        return OrderModel.findById(id);
    }

    async listOrders({ query, page, limit }: OrderListParams) {
        return OrderModel.find(query)
            .skip((page - 1) * limit)
            .limit(limit);
    }

    async deleteById(id: string){
        return OrderModel.findByIdAndDelete(id);
    }
}