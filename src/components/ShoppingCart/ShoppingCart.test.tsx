import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import ShoppingCart from "./ShoppingCart";

type CartProps = {
  code: string;
};

// --- Mock child components ---
vi.mock("./CartItem", () => ({
  __esModule: true,
  default: ({ code }: CartProps) => <div data-testid="cart-item">{code}</div>,
}));

vi.mock("./Summary", () => ({
  __esModule: true,
  default: () => <div data-testid="summary" />,
}));

// --- Mock Zustand store ---
let mockCartItems: Record<string, number> = {};

vi.mock("@/stores/useCartStore", () => ({
  useCartStore: (selector: Function) =>
    selector({
      cartItems: mockCartItems,
    }),
}));

describe("ShoppingCart component", () => {
  beforeEach(() => {
    mockCartItems = {}; // reset before each test
  });

  it("renders empty state when cart is empty", () => {
    mockCartItems = {};

    render(<ShoppingCart />);

    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();

    expect(screen.getByText("0 items in cart")).toBeInTheDocument();
  });

  it("renders correct item count and pluralization", () => {
    mockCartItems = { RW001: 1 };

    render(<ShoppingCart />);

    expect(screen.getByText("1 item in cart")).toBeInTheDocument();
  });

  it("renders multiple items count correctly", () => {
    mockCartItems = { RW001: 2, BL002: 1 }; // total = 3

    render(<ShoppingCart />);

    expect(screen.getByText("3 items in cart")).toBeInTheDocument();
  });

  it("renders CartItem for each cart entry", () => {
    mockCartItems = { RW001: 2, BL002: 1 };

    render(<ShoppingCart />);

    const items = screen.getAllByTestId("cart-item");
    expect(items.length).toBe(2);

    expect(screen.getByText("RW001")).toBeInTheDocument();
    expect(screen.getByText("BL002")).toBeInTheDocument();
  });

  it("always renders Summary component", () => {
    mockCartItems = {};

    render(<ShoppingCart />);

    expect(screen.getByTestId("summary")).toBeInTheDocument();
  });
});
