import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { ModalProps } from "@/components/Modal";

// --- Mock Header ---
vi.mock("@/layouts/Header", () => ({
  Header: ({ setOpenModal }: ) => (
    <button
      data-testid="open-cart"
      onClick={() => setOpenModal(true)}
    >
      Open Cart
    </button>
  ),
}));

// --- Mock ProductCatalogue ---
vi.mock("@/components/ProductCatalogue", () => ({
  ProductCatalogue: () => <div data-testid="catalogue" />,
}));

// --- Mock Modal ---
vi.mock("@/components/Modal", () => ({
  Modal: ({ setOpenModal }: ModalProps) => (
    <div data-testid="modal">
      <button data-testid="close-modal" onClick={() => setOpenModal(false)}>
        Close
      </button>
    </div>
  ),
}));

describe("App component", () => {
  it("renders Header and ProductCatalogue, but not Modal initially", () => {
    render(<App />);

    expect(screen.getByTestId("open-cart")).toBeInTheDocument();
    expect(screen.getByTestId("catalogue")).toBeInTheDocument();
    expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
  });

  it("opens the modal when Header triggers setOpenModal(true)", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByTestId("open-cart"));

    expect(screen.getByTestId("modal")).toBeInTheDocument();
  });

  it("closes the modal when Modal triggers setOpenModal(false)", async () => {
    const user = userEvent.setup();
    render(<App />);

    // open modal
    await user.click(screen.getByTestId("open-cart"));
    expect(screen.getByTestId("modal")).toBeInTheDocument();

    // close modal
    await user.click(screen.getByTestId("close-modal"));
    expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
  });
});
