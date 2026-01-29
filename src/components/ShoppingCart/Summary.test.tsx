import { render, screen } from "@testing-library/react";
import Summary from "@/components/ShoppingCart/Summary";
import { useCartStore } from "@/stores/useCartStore";
import * as calcUtils from "@/utils/calcUtils";
import { vi } from "vitest";

vi.mock("@/stores/useCartStore");
vi.mock("@/utils/calcUtils");

describe("Summary", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders item count, delivery info, and total price correctly", () => {
    // Zustand selector returns ONLY cartItems
    (useCartStore as unknown as vi.Mock).mockReturnValue({
      R01: 2,
      G01: 1,
    });

    vi.spyOn(calcUtils, "getProductsPrice").mockReturnValue(25.0);

    vi.spyOn(calcUtils, "getDeliveryCharge").mockReturnValue({
      deliveryCharge: 4.95,
      deliveryType: "Standard Delivery",
    });

    render(<Summary />);

    // Item count (2 + 1 = 3)
    expect(screen.getByText("3")).toBeInTheDocument();

    // Delivery type badge
    expect(screen.getByText("Standard Delivery")).toBeInTheDocument();

    // Delivery charge
    expect(screen.getByText("$4.95")).toBeInTheDocument();

    // Total price = 25 + 4.95 = 29.95
    expect(screen.getByText("$29.95")).toBeInTheDocument();
  });

  it("does not render delivery badge when deliveryType is null", () => {
    (useCartStore as unknown as vi.Mock).mockReturnValue({
      B01: 1,
    });

    vi.spyOn(calcUtils, "getProductsPrice").mockReturnValue(10.0);

    vi.spyOn(calcUtils, "getDeliveryCharge").mockReturnValue({
      deliveryCharge: 4.95,
      deliveryType: null,
    });

    render(<Summary />);

    // Delivery charge still shown
    expect(screen.getByText("$4.95")).toBeInTheDocument();

    // Badge should NOT appear
    expect(screen.queryByText("Standard Delivery")).not.toBeInTheDocument();
    expect(screen.queryByText("Reduced Delivery")).not.toBeInTheDocument();
    expect(screen.queryByText("Free Delivery")).not.toBeInTheDocument();
  });
});
