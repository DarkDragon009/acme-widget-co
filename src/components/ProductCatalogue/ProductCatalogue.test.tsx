import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ProductCatalogue from "./ProductCatalogue";
import products from "@/data/products.json";
import { IProduct } from "@/types";


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

vi.mock("./SpecialOffer", () => ({
  __esModule: true,
  default: () => <div data-testid="special-offer" />,
}));

describe("ProductCatalogue component", () => {
  it("renders the catalogue header", () => {
    render(<ProductCatalogue />);

    expect(
      screen.getByText(/product catalogue/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/sales system proof of concept/i)
    ).toBeInTheDocument();
  });

  it("renders the catalogue section title and description", () => {
    render(<ProductCatalogue />);

    expect(
      screen.getByRole("heading", { name: /catalogue/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/core widget range currently available/i)
    ).toBeInTheDocument();
  });

  it("renders one ProductCard per product in the JSON file", () => {
    render(<ProductCatalogue />);

    const cards = screen.getAllByTestId("product-card");
    expect(cards.length).toBe(products.length);

    // Optional: verify names appear
    products.forEach((p) => {
      expect(screen.getByText(p.name)).toBeInTheDocument();
    });
  });

  it("renders DeliveryChargeRules and SpecialOffer components", () => {
    render(<ProductCatalogue />);

    expect(screen.getByTestId("delivery-rules")).toBeInTheDocument();
    expect(screen.getByTestId("special-offer")).toBeInTheDocument();
  });

  it("renders the footer text", () => {
    render(<ProductCatalogue />);

    expect(
      screen.getByText(/all prices in usd, inclusive of tax/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/delivery calculated at checkout/i)
    ).toBeInTheDocument();
  });
});
