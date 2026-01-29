import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  getSpecialOfferPrice,
  getProductsPrice,
  getDeliveryCharge,
} from "./calcUtils";

// Mock product JSON
vi.mock("@/data/products.json", () => ({
  default: [
    { code: "R01", name: "Red Widget", price: 32.95 },
    { code: "G01", name: "Green Widget", price: 24.95 },
    { code: "B01", name: "Blue Widget", price: 7.95 },
  ],
}));

describe("getSpecialOfferPrice", () => {
  it("calculates correct price for even quantities", () => {
    // 2 items → 1 pair → price * 1.5
    const result = getSpecialOfferPrice(2, 32.95);
    expect(result).toBeCloseTo(32.95 * 1.5, 5);
  });

  it("calculates correct price for odd quantities", () => {
    // 3 items → 1 pair + 1 full price
    const result = getSpecialOfferPrice(3, 32.95);
    expect(result).toBeCloseTo(32.95 * 1.5 + 32.95, 5);
  });
});

describe("getProductsPrice", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 0 for empty cart", () => {
    expect(getProductsPrice({})).toBe(0);
  });

  it("calculates normal product totals", () => {
    expect(getProductsPrice({ G01: 2 })).toBeCloseTo(24.95 * 2, 5);
    expect(getProductsPrice({ B01: 3 })).toBeCloseTo(7.95 * 3, 5);
  });

  it("applies R01 special offer correctly (even)", () => {
    const result = getProductsPrice({ R01: 2 });
    expect(result).toBeCloseTo(32.95 * 1.5, 5);
  });

  it("applies R01 special offer correctly (odd)", () => {
    const result = getProductsPrice({ R01: 3 });
    expect(result).toBeCloseTo(32.95 * 1.5 + 32.95, 5);
  });

  it("handles mixed products with R01 discount", () => {
    const r01 = 32.95 * 1.5; // 2 items
    const g01 = 24.95 * 1;
    const b01 = 7.95 * 3;

    const expected = r01 + g01 + b01;

    const result = getProductsPrice({ R01: 2, G01: 1, B01: 3 });
    expect(result).toBeCloseTo(expected, 5);
  });

  it("ignores unknown product codes", () => {
    expect(getProductsPrice({ XYZ: 5 })).toBe(0);
  });
});

describe("getDeliveryCharge", () => {
  it("returns 0 + null when total is 0", () => {
    expect(getDeliveryCharge(0)).toEqual({
      deliveryCharge: 0,
      deliveryType: null,
    });
  });

  it("returns Standard Delivery for totals < 50", () => {
    expect(getDeliveryCharge(49.99)).toEqual({
      deliveryCharge: 4.95,
      deliveryType: "Standard Delivery",
    });
  });

  it("returns Reduced Delivery for totals < 90", () => {
    expect(getDeliveryCharge(50)).toEqual({
      deliveryCharge: 2.95,
      deliveryType: "Reduced Delivery",
    });

    expect(getDeliveryCharge(89.99)).toEqual({
      deliveryCharge: 2.95,
      deliveryType: "Reduced Delivery",
    });
  });

  it("returns Free Delivery for totals >= 90", () => {
    expect(getDeliveryCharge(90)).toEqual({
      deliveryCharge: 0,
      deliveryType: "Free Delivery",
    });

    expect(getDeliveryCharge(150)).toEqual({
      deliveryCharge: 0,
      deliveryType: "Free Delivery",
    });
  });
});
