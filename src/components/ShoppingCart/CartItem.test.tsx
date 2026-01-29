import { render, screen, fireEvent } from "@testing-library/react";
import CartItem from "@/components/ShoppingCart/CartItem";
import { useCartStore } from "@/stores/useCartStore";
import * as calcUtils from "@/utils/calcUtils";
import { vi } from "vitest";

// Mock product JSON
vi.mock("@/data/products.json", () => ({
  default: [
    {
      code: "R01",
      name: "Red Widget",
      price: 32.95,
      imageUrl: "/red.png",
    },
    {
      code: "G01",
      name: "Green Widget",
      price: 24.95,
      imageUrl: "/green.png",
    },
  ],
}));

// Mock Zustand store
vi.mock("@/stores/useCartStore");

// Explicit calcUtils mock
vi.mock("@/utils/calcUtils", () => ({
  getSpecialOfferPrice: vi.fn(),
}));

// Mock FontAwesome
vi.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: () => <span>icon</span>,
}));

describe("CartItem", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockStore = (overrides = {}) => {
    (useCartStore as unknown as vi.Mock).mockReturnValue({
      cartItems: {},
      increase: vi.fn(),
      decrease: vi.fn(),
      remove: vi.fn(),
      ...overrides,
    });
  };

  it("renders product name, image, and quantity", () => {
    mockStore({
      cartItems: { G01: 2 },
    });

    render(<CartItem code="G01" />);

    expect(screen.getByText("Green Widget")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Green Widget" })).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("calls increase when clicking + button", () => {
    const increase = vi.fn();

    mockStore({
      cartItems: { G01: 1 },
      increase,
    });

    render(<CartItem code="G01" />);

    fireEvent.click(screen.getByLabelText("Increase quantity for Green Widget"));
    expect(increase).toHaveBeenCalledWith("G01");
  });

  it("calls decrease when clicking - button", () => {
    const decrease = vi.fn();

    mockStore({
      cartItems: { G01: 2 },
      decrease,
    });

    render(<CartItem code="G01" />);

    fireEvent.click(screen.getByLabelText("Decrease quantity for Green Widget"));
    expect(decrease).toHaveBeenCalledWith("G01");
  });

  it("disables decrease button when quantity is 1", () => {
    mockStore({
      cartItems: { G01: 1 },
    });

    render(<CartItem code="G01" />);

    const btn = screen.getByLabelText("Decrease quantity for Green Widget");
    expect(btn).toBeDisabled();
  });

  it("calls remove when clicking remove button", () => {
    const remove = vi.fn();

    mockStore({
      cartItems: { G01: 1 },
      remove,
    });

    render(<CartItem code="G01" />);

    fireEvent.click(screen.getByLabelText("Remove Green Widget"));
    expect(remove).toHaveBeenCalledWith("G01");
  });

  it("renders normal price when not special offer", () => {
    mockStore({
      cartItems: { G01: 2 },
    });

    render(<CartItem code="G01" />);

    expect(screen.getByText("$49.90")).toBeInTheDocument(); // 24.95 * 2
  });

  it("renders special offer price for R01 when quantity > 1", () => {
    mockStore({
      cartItems: { R01: 2 },
    });

    // Correct mock — ensures component uses this value
    (calcUtils.getSpecialOfferPrice as vi.Mock).mockReturnValue(49.425);

    render(<CartItem code="R01" />);

    // Original line total
    expect(screen.getByText("$65.90")).toBeInTheDocument();

    // Discounted price (49.425 → 49.42)
    expect(screen.getByText("$49.42")).toBeInTheDocument();
  });

  it("returns null if product metadata is missing", () => {
    mockStore({
      cartItems: { XYZ: 1 },
    });

    const { container } = render(<CartItem code="XYZ" />);
    expect(container.firstChild).toBeNull();
  });
});
