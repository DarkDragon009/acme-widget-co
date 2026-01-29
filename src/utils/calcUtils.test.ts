import { describe, it, expect, vi } from "vitest";
import { getProductsPrice, getDeliveryCharge } from "./calcUtils";

// --- Mock product JSON ---
vi.mock("@/data/products.json", () => ({
  default: [
    { code: "R01", name: "Red Widget", price: 32.95 },
    { code: "G01", name: "Green Widget", price: 24.95 },
    { code: "B01", name: "Blue Widget", price: 7.95 },
  ],
}));

describe("getProductsPrice", () => {
  it("returns 0 for an empty cart", () => {
    expect(getProductsPrice({})).toBe(0);
  });

  it("calculates normal product totals", () => {
    expect(getProductsPrice({ G01: 2 })).toBe(24.95 * 2);
    expect(getProductsPrice({ B01: 3 })).toBe(7.95 * 3);
  });

  it("applies R01 buy-one-get-second-half-price for even quantities", () => {
    // 2 items → 1 pair → price * 1.5
    const price = 32.95 * 1.5;
    expect(getProductsPrice({ R01: 2 })).toBeCloseTo(price, 5);
  });

  it("applies R01 discount correctly for odd quantities", () => {
    // 3 items → 1 pair + 1 full price
    const expected = 32.95 * 1.5 + 32.95;
    expect(getProductsPrice({ R01: 3 })).toBeCloseTo(expected, 5);
  });

  it("handles mixed products with R01 discount", () => {
    const r01 = 32.95 * 1.5; // 2 items
    const g01 = 24.95 * 1;
    const b01 = 7.95 * 3;

    const expected = r01 + g01 + b01;

    expect(
      getProductsPrice({ R01: 2, G01: 1, B01: 3 })
    ).toBeCloseTo(expected, 5);
  });

  it("ignores unknown product codes", () => {
    expect(getProductsPrice({ XYZ: 5 })).toBe(0);
  });
});

describe("getDeliveryCharge", () => {
  it("returns 0 when total is 0", () => {
    expect(getDeliveryCharge(0)).toBe(0);
  });

  it("returns 4.95 when total < 50", () => {
    expect(getDeliveryCharge(49.99)).toBe(4.95);
  });

  it("returns 2.95 when total < 90", () => {
    expect(getDeliveryCharge(50)).toBe(2.95);
    expect(getDeliveryCharge(89.99)).toBe(2.95);
  });

  it("returns 0 when total >= 90", () => {
    expect(getDeliveryCharge(90)).toBe(0);
    expect(getDeliveryCharge(150)).toBe(0);
  });
});
