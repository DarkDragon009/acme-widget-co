import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Modal } from "../Modal";

describe("Modal component", () => {
  it("renders the modal with title", () => {
    const mockSetOpen = vi.fn();

    render(<Modal setOpenModal={mockSetOpen} />);

    expect(
      screen.getByRole("heading", { name: /shopping cart/i })
    ).toBeInTheDocument();
  });

  it("renders children when provided", () => {
    const mockSetOpen = vi.fn();

    render(
      <Modal setOpenModal={mockSetOpen}>
        <div data-testid="modal-child">Cart content</div>
      </Modal>
    );

    expect(screen.getByTestId("modal-child")).toBeInTheDocument();
    expect(screen.getByText("Cart content")).toBeInTheDocument();
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
    expect(modalDialog).toBeTruthy();

    // Modal content
    const modalContent = modalDialog?.querySelector(".modal-content");
    expect(modalContent).toBeTruthy();
  });
});
