import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CartItem from "./CartItem";

// --- Mock product JSON ---
vi.mock("@/data/products.json", () => ({
  default: [
    {
      code: "RW001",
      name: "Red Widget",
      price: 19.99,
      imageUrl: "/images/red-widget.png",
    },
  ],
}));

// --- Mock Zustand store ---
const mockIncrease = vi.fn();
const mockDecrease = vi.fn();
const mockRemove = vi.fn();

let mockCartItems = { RW001: 2 };

vi.mock("@/stores/useCartStore", () => ({
  useCartStore: (selector: any) =>
    selector({
      cartItems: mockCartItems,
      increase: mockIncrease,
      decrease: mockDecrease,
      remove: mockRemove,
    }),
}));

describe("CartItem component", () => {
  beforeEach(() => {
    mockIncrease.mockReset();
    mockDecrease.mockReset();
    mockRemove.mockReset();
    mockCartItems = { RW001: 2 };
  });

  it("renders product image, name, quantity, and line total", () => {
    render(<CartItem code="RW001" />);

    expect(screen.getByRole("img", { name: /red widget/i })).toHaveAttribute(
      "src",
      "/images/red-widget.png"
    );

    expect(screen.getByText("Red Widget")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("39.98")).toBeInTheDocument();
  });

  it("calls increase(code) when the plus button is clicked", async () => {
    const user = userEvent.setup();
    render(<CartItem code="RW001" />);

    const increaseBtn = screen.getByRole("button", {
      name: /increase quantity for red widget/i,
    });

    await user.click(increaseBtn);

    expect(mockIncrease).toHaveBeenCalledTimes(1);
    expect(mockIncrease).toHaveBeenCalledWith("RW001");
  });

  it("calls decrease(code) when the minus button is clicked", async () => {
    const user = userEvent.setup();
    render(<CartItem code="RW001" />);

    const decreaseBtn = screen.getByRole("button", {
      name: /decrease quantity for red widget/i,
    });

    await user.click(decreaseBtn);

    expect(mockDecrease).toHaveBeenCalledTimes(1);
    expect(mockDecrease).toHaveBeenCalledWith("RW001");
  });

  it("disables the decrease button when quantity is 1", () => {
    mockCartItems = { RW001: 1 };

    render(<CartItem code="RW001" />);

    const decreaseBtn = screen.getByRole("button", {
      name: /decrease quantity for red widget/i,
    });

    expect(decreaseBtn).toBeDisabled();
  });

  it("calls remove(code) when the remove button is clicked", async () => {
    const user = userEvent.setup();
    render(<CartItem code="RW001" />);

    const removeBtn = screen.getByRole("button", {
      name: /remove red widget/i,
    });

    await user.click(removeBtn);

    expect(mockRemove).toHaveBeenCalledTimes(1);
    expect(mockRemove).toHaveBeenCalledWith("RW001");
  });

  it("returns null if product metadata is missing", () => {
    render(<CartItem code="INVALID" />);

    expect(screen.queryByRole("row")).not.toBeInTheDocument();
  });
});
