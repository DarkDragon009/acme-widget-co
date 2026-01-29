import { beforeEach, describe, expect, it, vi, type Mock } from "vitest";
import { render, screen } from "@testing-library/react";
import Summary from "@/components/ShoppingCart/Summary";
import { useCartStore } from "@/stores/useCartStore";
import * as calcUtils from "@/utils/calcUtils";
import * as deliveryRules from "@/utils/deliveryRules";

vi.mock("@/stores/useCartStore");

vi.mock("@/utils/deliveryRules", () => ({
  getDeliveryPrice: vi.fn(),
}));

describe("Summary", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders delivery info and total price correctly", () => {
    (useCartStore as unknown as Mock).mockImplementation((selector: (s: { cartItems: Record<string, number> }) => unknown) =>
      selector({ cartItems: { R01: 2, G01: 1 } })
    );

    vi.spyOn(calcUtils, "getProductsPrice").mockReturnValue(25.0);
    vi.spyOn(deliveryRules, "getDeliveryPrice").mockReturnValue({
      delivery_charge: 4.95,
      delivery_type: "Standard Delivery",
    });
    vi.spyOn(calcUtils, "getTotalPrice").mockReturnValue(29.95);

    render(<Summary />);

    // Delivery badge
    expect(screen.getByText("Standard Delivery")).toBeInTheDocument();

    // Delivery charge
    expect(screen.getByText("$4.95")).toBeInTheDocument();

    // Total price
    expect(screen.getByText("$29.95")).toBeInTheDocument();
  });

  it("does not render delivery badge when delivery_type is undefined", () => {
    (useCartStore as unknown as Mock).mockImplementation((selector: (s: { cartItems: Record<string, number> }) => unknown) =>
      selector({ cartItems: { B01: 1 } })
    );

    vi.spyOn(calcUtils, "getProductsPrice").mockReturnValue(10.0);
    vi.spyOn(deliveryRules, "getDeliveryPrice").mockReturnValue({
      delivery_charge: 4.95,
      delivery_type: undefined,
    });
    vi.spyOn(calcUtils, "getTotalPrice").mockReturnValue(14.95);

    render(<Summary />);

    // Delivery charge still shown
    expect(screen.getByText("$4.95")).toBeInTheDocument();

    // Badge should NOT appear
    expect(screen.queryByText("Standard Delivery")).not.toBeInTheDocument();
    expect(screen.queryByText("Reduced Delivery")).not.toBeInTheDocument();
    expect(screen.queryByText("Free Delivery")).not.toBeInTheDocument();

    // Total price
    expect(screen.getByText("$14.95")).toBeInTheDocument();
  });
});
