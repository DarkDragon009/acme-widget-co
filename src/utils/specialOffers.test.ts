/// <reference types="vitest" />
import {
  OFFER_RULES,
  getAppliedSpecialOfferPrice,
  type OfferRule,
} from "@/utils/specialOffers";
import { describe, expect, it, vi } from "vitest";

// Replicate truncation without pulling in calcUtils (avoids circular dependency)
vi.mock("@/utils/calcUtils", () => ({
  toTwoDecimalsTruncate: (value: number) => Math.trunc(value * 100) / 100,
}));

describe("specialOffers", () => {
  // ------------------------------------------------------------
  // OFFER_RULES
  // ------------------------------------------------------------
  describe("OFFER_RULES", () => {
    it("exports at least one rule with required OfferRule fields", () => {
      expect(OFFER_RULES.length).toBeGreaterThanOrEqual(1);
      OFFER_RULES.forEach((rule: OfferRule) => {
        expect(rule).toHaveProperty("code");
        expect(rule).toHaveProperty("description");
        expect(rule).toHaveProperty("apply");
        expect(typeof rule.code).toBe("string");
        expect(typeof rule.description).toBe("string");
        expect(typeof rule.apply).toBe("function");
      });
    });

    it("includes R01 buy-one-get-second-half-price rule", () => {
      const r01 = OFFER_RULES.find((r) => r.code === "R01");
      expect(r01).toBeDefined();
      expect(r01?.description).toBe("Buy one, get 2nd in half");
    });
  });

  // ------------------------------------------------------------
  // getAppliedSpecialOfferPrice
  // ------------------------------------------------------------
  describe("getAppliedSpecialOfferPrice", () => {
    const unitPrice = 32.95;

    it("returns base price (count × unitPrice) when code is empty or invalid", () => {
      expect(getAppliedSpecialOfferPrice("", 2, unitPrice)).toBe(65.9);
      expect(getAppliedSpecialOfferPrice("UNKNOWN", 2, unitPrice)).toBe(65.9);
    });

    it("returns base price when productCount <= 0 or unitPrice <= 0", () => {
      expect(getAppliedSpecialOfferPrice("R01", 0, unitPrice)).toBe(0);
      expect(getAppliedSpecialOfferPrice("R01", 2, 0)).toBe(0);
      expect(getAppliedSpecialOfferPrice("R01", 2, -10)).toBe(-20); // basePrice
    });

    it("applies R01 offer: 2 items = 1.5× unit price (pair at half price)", () => {
      // 1.5 * 32.95 = 49.425 → truncate 49.42
      expect(getAppliedSpecialOfferPrice("R01", 2, unitPrice)).toBe(49.42);
    });

    it("applies R01 offer: 3 items = 1.5× + 1× unit price", () => {
      // 49.425 + 32.95 = 82.375 → truncate 82.37
      expect(getAppliedSpecialOfferPrice("R01", 3, unitPrice)).toBe(82.37);
    });

    it("applies R01 offer: 1 item = full unit price", () => {
      expect(getAppliedSpecialOfferPrice("R01", 1, unitPrice)).toBe(32.95);
    });

    it("applies R01 offer: 4 items = 2 pairs = 3× unit price", () => {
      // 2 * 1.5 * 32.95 = 98.85
      expect(getAppliedSpecialOfferPrice("R01", 4, unitPrice)).toBe(98.85);
    });
  });
});
