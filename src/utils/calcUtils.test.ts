import {
  getSpecialOfferPrice,
  getProductsPrice,
  getDeliveryCharge,
  getTotalPrice,
} from "@/utils/calcUtils";
import { vi } from "vitest";

// Mock ONLY the products JSON — never calcUtils itself
vi.mock("@/data/products.json", () => ({
  default: [
    { code: "R01", name: "Red Widget", price: 32.95 },
    { code: "G01", name: "Green Widget", price: 24.95 },
    { code: "B01", name: "Blue Widget", price: 7.95 },
  ],
}));

describe("calcUtils", () => {
  // ------------------------------------------------------------
  // getSpecialOfferPrice
  // ------------------------------------------------------------
  describe("getSpecialOfferPrice", () => {
    it("calculates correct price for even quantities", () => {
      // 32.95 * 1.5 = 49.425 → truncated → 49.42
      expect(getSpecialOfferPrice(2, 32.95)).toBe(49.42);
    });

    it("calculates correct price for odd quantities", () => {
      // pair = 49.425 → 49.42, single = 32.95 → total = 82.37
      expect(getSpecialOfferPrice(3, 32.95)).toBe(82.37);
    });

    it("returns 0 for zero quantity", () => {
      expect(getSpecialOfferPrice(0, 32.95)).toBe(0);
    });
  });

  // ------------------------------------------------------------
  // getProductsPrice
  // ------------------------------------------------------------
  describe("getProductsPrice", () => {
    it("returns 0 for empty cart", () => {
      expect(getProductsPrice({})).toBe(0);
    });

    it("calculates normal product totals", () => {
      expect(getProductsPrice({ G01: 2 })).toBe(49.9); // 24.95 * 2
      expect(getProductsPrice({ B01: 3 })).toBe(23.85); // 7.95 * 3
    });

    it("applies R01 special offer correctly (even)", () => {
      expect(getProductsPrice({ R01: 2 })).toBe(49.42);
    });

    it("applies R01 special offer correctly (odd)", () => {
      expect(getProductsPrice({ R01: 3 })).toBe(82.37);
    });

    it("handles mixed products with R01 discount", () => {
      const expected = 49.42 + 24.95 + 15.9; // = 90.27
      expect(getProductsPrice({ R01: 2, G01: 1, B01: 2 })).toBe(expected);
    });

    it("ignores unknown product codes", () => {
      expect(getProductsPrice({ XYZ: 5 })).toBe(0);
    });
  });

  // ------------------------------------------------------------
  // getDeliveryCharge
  // ------------------------------------------------------------
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
    });

    it("returns Free Delivery for totals >= 90", () => {
      expect(getDeliveryCharge(90)).toEqual({
        deliveryCharge: 0,
        deliveryType: "Free Delivery",
      });
    });
  });

  // ------------------------------------------------------------
  // getTotalPrice
  // ------------------------------------------------------------
  describe("getTotalPrice", () => {
    it("calculates total including delivery charge", () => {
      // 49.42 + 4.95 = 54.37 (JS float = 54.370000000000005)
      expect(getTotalPrice({ R01: 2 })).toBeCloseTo(54.37, 2);
    });

    it("calculates total with free delivery", () => {
      // 82.37 + 24.95 = 107.32 (JS float = 107.32000000000001)
      expect(getTotalPrice({ R01: 3, G01: 1 })).toBeCloseTo(107.32, 2);
    });

    it("calculates total for empty cart", () => {
      expect(getTotalPrice({})).toBe(0);
    });
  });
});
