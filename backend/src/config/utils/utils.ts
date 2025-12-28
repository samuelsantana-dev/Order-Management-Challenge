import { OrderState } from "./enum/order"

export const flow = [OrderState.CREATED, OrderState.ANALYSIS, OrderState.COMPLETED];

export function getNextState(current: OrderState): OrderState | null {
    const index = flow.indexOf(current);
    if (index === -1 || index === flow.length - 1) return null;
    return flow[index + 1] as OrderState | null;
}
