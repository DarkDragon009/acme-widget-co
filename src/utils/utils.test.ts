import { getFormattedPrice } from "@/utils/utils";
import { describe, expect, it } from "vitest";

describe("utils", () => {
  describe("getFormattedPrice", () => {
    it("formats whole numbers with two decimals", () => {
      expect(getFormattedPrice(10)).toBe("$10.00");
      expect(getFormattedPrice(0)).toBe("$0.00");
    });

    it("formats decimals to two places", () => {
      expect(getFormattedPrice(32.95)).toBe("$32.95");
      expect(getFormattedPrice(4.9)).toBe("$4.90");
    });

    it("rounds to two decimal places", () => {
      // 49.425 is not exactly representable; toFixed(2) yields "49.42"
      expect(getFormattedPrice(49.425)).toBe("$49.42");
      expect(getFormattedPrice(19.996)).toBe("$20.00");
    });
  });
});
