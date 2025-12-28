import { advanceOrder } from './../controllers/order.controller';
import { describe, test, expect, vi, beforeEach } from "vitest";
import { OrderModel } from "../config/models/order";
import { OrderState } from "../config/utils/enum/order";
vi.mock("../config/models/order", () => ({
  OrderModel: {
    findById: vi.fn()
  }
}));

const mockResponse = () => {
  const res: any = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

describe("advanceOrder Controller", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("Impede avanço quando já está COMPLETED", async () => {
    (OrderModel.findById as any).mockResolvedValue({
      state: OrderState.COMPLETED
    });

    const req: any = { params: { id: "123" } };
    const res = mockResponse();

    await advanceOrder(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Pedido já está COMPLETED"
    });
  });

  test("Avança de ANALYSIS → COMPLETED", async () => {
    (OrderModel.findById as any).mockResolvedValue({
      state: OrderState.ANALYSIS
    });

    const req: any = { params: { id: "123" } };
    const res = mockResponse();

    await advanceOrder(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Pedido avançaria de ANALYSIS para COMPLETED"
    });
  });
});