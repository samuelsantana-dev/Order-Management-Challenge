import { describe, test, expect } from "vitest";
import { OrderState } from "../config/utils/enum/order";
import { getNextState } from "../config/utils/utils";

describe("Order State Transition", () => {

  test("Avança de CREATED → ANALYSIS", () => {
    expect(getNextState(OrderState.CREATED)).toBe(OrderState.ANALYSIS);
  });

  test("Avança de ANALYSIS → COMPLETED", () => {
    expect(getNextState(OrderState.ANALYSIS)).toBe(OrderState.COMPLETED);
  });

  test("Bloqueia quando já está COMPLETED", () => {
    expect(getNextState(OrderState.COMPLETED)).toBeNull();
  });

  test("Retorna null para estado inválido", () => {
    expect(getNextState("INVALID" as OrderState)).toBeNull();
  });

});
