import { OrderModel } from './../config/models/order';

export class OrderRepository {
    async createOrder(data: any) {
        return OrderModel.create(data);
    }

    async findById(id: string){
        return OrderModel.findById(id);
    }

    async listOrders(query: any, page: number, limit: number) {
        return OrderModel.find(query)
            .skip((page - 1) * limit)
            .limit(limit);
    }
}