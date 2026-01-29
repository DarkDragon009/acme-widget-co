import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Modal } from "../Modal";

// Correct mock for named export
vi.mock("@/components/ShoppingCart", () => ({
  ShoppingCart: () => <div data-testid="shopping-cart-mock" />,
}));

describe("Modal component", () => {
  it("renders the modal with title and ShoppingCart", () => {
    const mockSetOpen = vi.fn();

    render(<Modal setOpenModal={mockSetOpen} />);

    expect(
      screen.getByRole("heading", { name: /shopping cart/i })
    ).toBeInTheDocument();

    expect(screen.getByTestId("shopping-cart-mock")).toBeInTheDocument();
  });

  it("calls setOpenModal(false) when close button is clicked", async () => {
    const user = userEvent.setup();
    const mockSetOpen = vi.fn();

    render(<Modal setOpenModal={mockSetOpen} />);

    const closeButton = screen.getByRole("button");

    await user.click(closeButton);

    expect(mockSetOpen).toHaveBeenCalledTimes(1);
    expect(mockSetOpen).toHaveBeenCalledWith(false);
  });

  it("applies correct modal structure and classes", () => {
    const mockSetOpen = vi.fn();

    render(<Modal setOpenModal={mockSetOpen} />);

    // The element with role="dialog" IS the modal root
    const modalRoot = screen.getByRole("dialog");

    expect(modalRoot).toHaveClass(
      "modal",
      "fade",
      "show",
      "d-block",
      "bg-modal"
    );

    // Inner modal-dialog
    const modalDialog = modalRoot.querySelector(".modal-dialog");
    expect(modalDialog).toBeInTheDocument();

    // Modal content
    const modalContent = modalDialog?.querySelector(".modal-content");
    expect(modalContent).toBeInTheDocument();
  });
});
