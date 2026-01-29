import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "./Header";

// --- Mock Zustand store ---
let mockCartItems = { R01: 2, G01: 1 }; // total = 3

vi.mock("@/stores/useCartStore", () => ({
  useCartStore: (selector: Function) =>
    selector({
      cartItems: mockCartItems,
    }),
}));

describe("Header component", () => {
  beforeEach(() => {
    mockCartItems = { R01: 2, G01: 1 }; // reset
  });

  it("renders the company title", () => {
    render(<Header setOpenModal={() => {}} />);

    expect(
      screen.getByRole("heading", { name: /acme widget co/i }),
    ).toBeInTheDocument();
  });

  it("displays the correct purchased items count", () => {
    render(<Header setOpenModal={() => {}} />);

    // 2 + 1 = 3
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("calls setOpenModal(true) when cart button is clicked", async () => {
    const user = userEvent.setup();
    const mockSetOpenModal = vi.fn();

    render(<Header setOpenModal={mockSetOpenModal} />);

    const button = screen.getByRole("button");

    await user.click(button);

    expect(mockSetOpenModal).toHaveBeenCalledTimes(1);
    expect(mockSetOpenModal).toHaveBeenCalledWith(true);
  });

  it("updates count when cartItems change", () => {
    // mockCartItems = { R01: 5 };

    render(<Header setOpenModal={() => {}} />);

    expect(screen.getByText("5")).toBeInTheDocument();
  });
});
