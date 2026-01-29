/// <reference types="vitest" />
import {
  DELIVERY_RULES,
  getDeliveryPrice,
  type DeliveryRule,
} from "@/utils/deliveryRules";
import { describe, expect, it } from "vitest";

describe("deliveryRules", () => {
  // ------------------------------------------------------------
  // DELIVERY_RULES
  // ------------------------------------------------------------
  describe("DELIVERY_RULES", () => {
    it("exports exactly three rules in ascending price_limit order", () => {
      expect(DELIVERY_RULES).toHaveLength(3);
      expect(DELIVERY_RULES[0].price_limit).toBe(50);
      expect(DELIVERY_RULES[1].price_limit).toBe(90);
      expect(DELIVERY_RULES[2].price_limit).toBe(Infinity);
    });

    it("each rule has required DeliveryRule fields", () => {
      DELIVERY_RULES.forEach((rule: DeliveryRule) => {
        expect(rule).toHaveProperty("delivery_title");
        expect(rule).toHaveProperty("delivery_charge");
        expect(rule).toHaveProperty("price_limit");
        expect(rule).toHaveProperty("delivery_type");
        expect(typeof rule.delivery_title).toBe("string");
        expect(typeof rule.delivery_charge).toBe("number");
        expect(typeof rule.price_limit).toBe("number");
        expect(typeof rule.delivery_type).toBe("string");
      });
    });
  });

  // ------------------------------------------------------------
  // getDeliveryPrice
  // ------------------------------------------------------------
  describe("getDeliveryPrice", () => {
    it("returns 0 charge and undefined type for total <= 0", () => {
      expect(getDeliveryPrice(0)).toEqual({
        delivery_charge: 0,
        delivery_type: undefined,
      });
      expect(getDeliveryPrice(-10)).toEqual({
        delivery_charge: 0,
        delivery_type: undefined,
      });
    });

    it("returns Standard Delivery for totals under $50", () => {
      expect(getDeliveryPrice(1)).toEqual({
        delivery_charge: 4.95,
        delivery_type: "Standard Delivery",
      });
      expect(getDeliveryPrice(49.99)).toEqual({
        delivery_charge: 4.95,
        delivery_type: "Standard Delivery",
      });
    });

    it("returns Reduced Delivery for totals >= $50 and under $90", () => {
      expect(getDeliveryPrice(50)).toEqual({
        delivery_charge: 2.95,
        delivery_type: "Reduced Delivery",
      });
      expect(getDeliveryPrice(89.99)).toEqual({
        delivery_charge: 2.95,
        delivery_type: "Reduced Delivery",
      });
    });

    it("returns Free Delivery for totals $90 or more", () => {
      expect(getDeliveryPrice(90)).toEqual({
        delivery_charge: 0,
        delivery_type: "Free Delivery",
      });
      expect(getDeliveryPrice(100)).toEqual({
        delivery_charge: 0,
        delivery_type: "Free Delivery",
      });
      expect(getDeliveryPrice(1000)).toEqual({
        delivery_charge: 0,
        delivery_type: "Free Delivery",
      });
    });
  });
});
