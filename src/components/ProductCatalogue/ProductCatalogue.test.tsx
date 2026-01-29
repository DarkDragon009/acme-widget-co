import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ProductCatalogue from "./ProductCatalogue";
import products from "@/data/products.json";
import { IProduct } from "@/types";

const mockSetOpenModal = vi.fn();

// --- Mock child components so we only test ProductCatalogue ---
vi.mock("./ProductCard", () => ({
  __esModule: true,
  default: ({ product }: { product: IProduct }) => (
    <div data-testid="product-card">{product.name}</div>
  ),
}));

vi.mock("./DeliveryChargeRules", () => ({
  __esModule: true,
  default: () => <div data-testid="delivery-rules" />,
}));

describe("ProductCatalogue component", () => {
  it("renders the catalogue header", () => {
    render(<ProductCatalogue setOpenModal={mockSetOpenModal} />);

    expect(
      screen.getByText(/product catalogue/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/sales system proof of concept/i)
    ).toBeInTheDocument();
  });

  it("renders one ProductCard per product in the JSON file", () => {
    render(<ProductCatalogue setOpenModal={mockSetOpenModal} />);

    const cards = screen.getAllByTestId("product-card");
    expect(cards.length).toBe(products.length);

    // Optional: verify names appear
    products.forEach((p) => {
      expect(screen.getByText(p.name)).toBeInTheDocument();
    });
  });

  it("renders DeliveryChargeRules in the aside", () => {
    render(<ProductCatalogue setOpenModal={mockSetOpenModal} />);

    expect(screen.getByTestId("delivery-rules")).toBeInTheDocument();
  });
});
