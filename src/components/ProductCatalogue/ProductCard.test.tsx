import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductCard from "./ProductCard";

// --- Mock Zustand store ---
const mockIncrease = vi.fn();

vi.mock("@/stores/useCartStore", () => ({
  useCartStore: (selector: Function) =>
    selector({
      cartItems: {},
      increase: mockIncrease,
    }),
}));

describe("ProductCard component", () => {
  beforeEach(() => {
    mockIncrease.mockClear();
  });

  const product = {
    code: "RW001",
    name: "Red Widget",
    price: 19.99,
    imageUrl: "/images/red-widget.png",
  };

  it("renders product name, price, and image", () => {
    render(<ProductCard product={product} />);

    expect(screen.getByText("Red Widget")).toBeInTheDocument();
    expect(screen.getByText("$19.99")).toBeInTheDocument();

    const img = screen.getByRole("img", { name: /red widget/i });
    expect(img).toHaveAttribute("src", "/images/red-widget.png");
  });

  it("renders the add-to-cart button", () => {
    render(<ProductCard product={product} />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("calls increase(product.code) when add-to-cart button is clicked", async () => {
    const user = userEvent.setup();

    render(<ProductCard product={product} />);

    const button = screen.getByRole("button");

    await user.click(button);

    expect(mockIncrease).toHaveBeenCalledTimes(1);
    expect(mockIncrease).toHaveBeenCalledWith("RW001");
  });
});
