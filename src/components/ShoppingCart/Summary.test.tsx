import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Summary from "./Summary";

// --- Mock calcUtils ---
const mockGetProductsPrice = vi.fn();
const mockGetDeliveryCharge = vi.fn();

vi.mock("@/utils/calcUtils", () => ({
  getProductsPrice: (...args: any[]) => mockGetProductsPrice(...args),
  getDeliveryCharge: (...args: any[]) => mockGetDeliveryCharge(...args),
}));

// --- Mock Zustand store ---
const mockCartItems = {
  R01: 2,
  G01: 1,
};

vi.mock("@/stores/useCartStore", () => ({
  useCartStore: (selector: any) =>
    selector({
      cartItems: mockCartItems,
    }),
}));

describe("Summary component", () => {
  beforeEach(() => {
    mockGetProductsPrice.mockReset();
    mockGetDeliveryCharge.mockReset();
  });

  it("renders summary heading", () => {
    mockGetProductsPrice.mockReturnValue(50);
    mockGetDeliveryCharge.mockReturnValue(4.95);

    render(<Summary />);

    expect(screen.getByRole("heading", { name: /summary/i })).toBeInTheDocument();
  });

  it("displays correct item count", () => {
    mockGetProductsPrice.mockReturnValue(50);
    mockGetDeliveryCharge.mockReturnValue(4.95);

    render(<Summary />);

    // 2 + 1 = 3 items
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("displays delivery charge and total price correctly", () => {
    mockGetProductsPrice.mockReturnValue(50);   // productsPrice
    mockGetDeliveryCharge.mockReturnValue(4.95); // deliveryCharge

    render(<Summary />);

    expect(screen.getByText("$4.95")).toBeInTheDocument();
    expect(screen.getByText("54.95")).toBeInTheDocument(); // 50 + 4.95
  });

  it("renders the checkout button", () => {
    mockGetProductsPrice.mockReturnValue(50);
    mockGetDeliveryCharge.mockReturnValue(4.95);

    render(<Summary />);

    expect(screen.getByRole("button", { name: /checkout/i })).toBeInTheDocument();
  });
});
